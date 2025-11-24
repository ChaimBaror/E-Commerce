import { GoogleGenAI } from '@google/genai';
import { AnalysisResult } from './imageAnalysisUtils';

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

function fileToGenerativePart(file: File, base64Data: string) {
  return {
    inlineData: {
      mimeType: file.type || 'image/jpeg',
      data: base64Data,
    },
  };
}

function getMimeTypeFromUrl(url: string): string {
  if (url.endsWith('.png')) return 'image/png';
  if (url.endsWith('.gif')) return 'image/gif';
  if (url.endsWith('.webp')) return 'image/webp';
  return 'image/jpeg';
}

export async function analyzeWithGemini(imageUrl: string): Promise<AnalysisResult> {
  const ai = getGeminiClient();
  const prompt = getAnalysisPrompt();

  try {
    console.log('📥 Fetching image from URL for Gemini analysis...');
    
    // Download image and convert to base64 (fileUri only works with GCS URLs)
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image from URL: ${imageResponse.status} ${imageResponse.statusText}`);
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const mimeType = imageResponse.headers.get('content-type') || getMimeTypeFromUrl(imageUrl);

    if (!mimeType.startsWith('image/')) {
      throw new Error(`Invalid mime type downloaded: ${mimeType}. Gemini requires an image.`);
    }
    console.log(`📷 Image prepared: ${mimeType}, size: ${(base64Image.length / 1024).toFixed(2)}KB`);

    const imagePart = {
      inlineData: {
        mimeType,
        data: base64Image,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [imagePart, prompt],
    });

    const text = response.text;
    if (!text) {
      throw new Error('Gemini API returned empty response');
    }

    return parseGeminiResponse(text, imageUrl);
  } catch (error) {
    console.error('Gemini URL analysis error:', error);
    throw error;
  }
}

export async function analyzeFileWithGemini(file: File): Promise<AnalysisResult> {
  const ai = getGeminiClient();
  const prompt = getAnalysisPrompt();

  try {
    console.log('📥 Processing uploaded file for Gemini analysis...');
    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = file.type || 'image/jpeg';

    if (!mimeType.startsWith('image/')) {
      throw new Error(`Invalid mime type: ${mimeType}. Gemini requires an image.`);
    }
    console.log(`📷 Image prepared: ${mimeType}, size: ${(base64Image.length / 1024).toFixed(2)}KB`);

    const imagePart = fileToGenerativePart(file, base64Image);
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [imagePart, prompt],
    });

    const text = response.text;
    if (!text) {
      throw new Error('Gemini API returned empty response');
    }

    return parseGeminiResponse(text, dataUrl);
  } catch (error) {
    console.error('Gemini file analysis error:', error);
    throw error;
  }
}

function getAnalysisPrompt(): string {
  return `Analyze this clothing/lingerie product image and provide a JSON response with the following structure:
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
}

function parseGeminiResponse(text: string, imageReference: string): AnalysisResult {
  console.log('📦 Received response from Gemini');

  let jsonText = text.trim();
  jsonText = jsonText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');

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

  if (!parsed.title || !parsed.description || !parsed.product_type) {
    console.error('Parsed incomplete JSON:', parsed);
    throw new Error('Gemini response missing required fields (title, description, or product_type)');
  }

  const finalVariants = (parsed.suggestedVariants || []).map((variant) => ({
    ...variant,
    image: imageReference,
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
    featured_image_url: imageReference,
  };

  console.log('✨ Successfully parsed analysis result');
  return result;
}
