import { NextRequest, NextResponse } from 'next/server';
import { analyzeImageFromUrl, AnalysisResult } from '../../../lib/imageAnalysisUtils';
import { analyzeWithGemini, analyzeFileWithGemini } from '../../../lib/geminiAnalysis';

function createResponse(result: AnalysisResult, fileUrl?: string): NextResponse {
  const responseBody = {
    ...result,
    ...(fileUrl && { featured_image_url: fileUrl })
  };
  return NextResponse.json(responseBody);
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    // Handle file upload (multipart/form-data)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('image') as File | null;

      if (!file) {
        return NextResponse.json(
          { error: 'No image file provided' },
          { status: 400 }
        );
      }

      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'File must be an image' },
          { status: 400 }
        );
      }

      let result: AnalysisResult;

      // Try Gemini analysis first
      if (process.env.GEMINI_API_KEY) {
        try {
          result = await analyzeFileWithGemini(file);
          if (result && Object.keys(result).length > 0) {
            // Use the featured_image_url from result or create data URL
            const imageUrl = result.featured_image_url || '';
            return createResponse(result, imageUrl);
          }
        } catch (geminiError) {
          console.log('Gemini analysis failed, using fallback:', geminiError);
        }
      }

      // Fallback: convert file to data URL and use URL-based analysis
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${file.type};base64,${base64}`;
      result = analyzeImageFromUrl(dataUrl);
      return createResponse(result, dataUrl);
    }

    // Handle URL-based request (JSON)
    const { imageUrl } = await request.json();

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    let result: AnalysisResult;

    // Try Gemini analysis first
    if (process.env.GEMINI_API_KEY) {
      try {
        result = await analyzeWithGemini(imageUrl);
        if (result && Object.keys(result).length > 0) {
          return createResponse(result, imageUrl);
        }
      } catch (geminiError) {
        console.log('Gemini analysis failed, using fallback:', geminiError);
      }
    }

    // Fallback
    result = analyzeImageFromUrl(imageUrl);
    return createResponse(result, imageUrl);
  } catch (error) {
    console.error('Image analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}

