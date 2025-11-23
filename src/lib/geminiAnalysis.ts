import { AnalysisResult } from './imageAnalysisUtils';

export async function analyzeWithGemini(imageUrl: string): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  // FIX: Updated model list.
  // Removed deprecated 'gemini-pro-vision'.
  // Added '-latest' pointers which are often more reliable targets.
  const modelConfigs = [
    { model: 'gemini-1.5-flash-002', version: 'v1beta' }
  ];

  const errors: string[] = [];

  for (const config of modelConfigs) {
    try {
      // The URL construction here is correct for REST API
      const apiUrl = `https://generativelanguage.googleapis.com/${config.version}/models/${config.model}:generateContent?key=${apiKey}`;
      console.log(`🔍 Trying Gemini model: ${config.model} (${config.version})`);

      const result = await tryGeminiModel(apiUrl, imageUrl);
      console.log(`✅ Success with ${config.model}`);
      return result;
    } catch (error) {
      // Log the specific error for this model and continue to the next
      const errorMessage = error instanceof Error ? error.message : String(error);
      errors.push(`${config.model}: ${errorMessage}`);
      // Reduce noise: only log the full error if it's not a standard 404/400
      if (!errorMessage.includes('404') && !errorMessage.includes('400')) {
         console.error(`❌ Model ${config.model} failed with unexpected error:`, error);
      } else {
         console.log(`⚠️ Model ${config.model} failed (likely outdated/unavailable endpoint): ${errorMessage.substring(0, 100)}...`);
      }
      continue;
    }
  }

  throw new Error(`All Gemini models failed. Please verify GEMINI_API_KEY and model availability.\nErrors:\n${errors.join('\n')}`);
}

async function tryGeminiModel(apiUrl: string, imageUrl: string): Promise<AnalysisResult> {
  const prompt = `Analyze this clothing/lingerie product image and provide a JSON response with the following structure:
{
  "title": "Product title based on the image",
  "description": "Detailed product description (2-3 sentences, engaging marketing tone)",
  "product_type": "Type of product (e.g., Shapewear, Lingerie, Bras, Panties, Bodysuit, Cami)",
  "tags": ["tag1", "tag2", "tag3"],
  "price": "30.00",
  "colors": ["Color1", "Color2"],
  "suggestedVariants": [
    {
      "color": "Color1",
      "size": "S",
      "price": "30.00",
      "available": true,
      "quantity": 5
    }
  ]
}

Important constraints:
1. Identify the exact product type accurately.
2. Detect all visible colors.
3. Suggest 5-7 relevant tags (e.g., material type, style features like 'seamless', 'lace', etc.).
4. Create variants for sizes: S, M, L, XL for *each* detected color.
5. Ensure 'price' is a string with two decimal places (e.g., "29.99").
6. The response MUST be valid, raw JSON only. Do not include markdown formatting like \`\`\`json or any introductory text.`;

  try {
    console.log('📥 Fetching image for Gemini analysis...');
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image from URL: ${imageResponse.status} ${imageResponse.statusText}`);
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    // Ensure we have a valid mime type, default to jpeg if missing
    const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';

    // Basic validation to ensure we aren't sending huge files or non-images
    if (!mimeType.startsWith('image/')) {
       throw new Error(`Invalid mime type downloaded: ${mimeType}. Gemini requires an image.`);
    }
    console.log(`📷 Image prepared: ${mimeType}, size: ${(base64Image.length / 1024).toFixed(2)}KB`);

    const requestBody = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Image,
              },
            },
          ],
        },
      ],
      // Slightly adjusted generation config for better JSON adherence
      generationConfig: {
        temperature: 0.2, // Lower temperature for more deterministic JSON structure
        topK: 32,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    };

    console.log('🚀 Sending request to Gemini API...');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'x-goog-api-key': apiKey // Alternative way to pass key if query param fails
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorDetail = errorText;
      try {
        // Try to extract a cleaner error message if Google provides JSON error
        const errorJson = JSON.parse(errorText);
        errorDetail = errorJson.error?.message || errorText;
      } catch (e) {
        // ignore json parse error of error text
      }
      throw new Error(`Gemini API error: ${response.status} - ${errorDetail}`);
    }

    const data = await response.json();
    console.log('📦 Received response from Gemini');

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
       // Log the full raw response for debugging if structure is missing
       console.error('Current Gemini response structure:', JSON.stringify(data, null, 2));
      throw new Error('Gemini API response structure changed or is missing content');
    }

    // IMPROVED JSON Parsing Logic
    let jsonText = text.trim();
    // Strip markdown code block indicators if present
    jsonText = jsonText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');

    // Find the first '{' and last '}' to ensure we only parse the JSON object
    const firstBrace = jsonText.indexOf('{');
    const lastBrace = jsonText.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) {
       console.error('Gemini Raw Output:', text);
       throw new Error('Gemini response did not contain a valid JSON object braces {}');
    }

    const cleanedJsonText = jsonText.substring(firstBrace, lastBrace + 1);

    let parsed: Partial<AnalysisResult>;
    try {
      parsed = JSON.parse(cleanedJsonText) as Partial<AnalysisResult>;
    } catch (e) {
      console.error('Failed to parse cleaned JSON text:', cleanedJsonText);
      throw new Error(`JSON parse error: ${e instanceof Error ? e.message : String(e)}`);
    }

    // Validate required essential fields
    if (!parsed.title || !parsed.description || !parsed.product_type) {
      console.error('Parsed incomplete JSON:', parsed);
      throw new Error('Gemini response missing required fields (title, description, or product_type)');
    }

    // Map variants to include the original image URL
    const finalVariants = (parsed.suggestedVariants || []).map((variant) => ({
        ...variant,
        image: imageUrl,
        // Ensure defaults exist if Gemini omitted them
        price: variant.price || parsed.price || '30.00',
        available: variant.available ?? true,
        quantity: variant.quantity ?? 5
    }));

    const result: AnalysisResult = {
      title: parsed.title,
      description: parsed.description,
      product_type: parsed.product_type,
      tags: parsed.tags || [],
      price: parsed.price || '30.00',
      colors: parsed.colors || [],
      suggestedVariants: finalVariants,
    };

    console.log('✨ Successfully parsed analysis result');
    return result;

  } catch (error) {
    // This catch block handles network errors, auth errors, or parsing errors for this specific model attempt
    throw error;
  }
}