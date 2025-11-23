import { NextRequest, NextResponse } from 'next/server';
import { analyzeImageFromUrl, AnalysisResult } from '../../../lib/imageAnalysisUtils';
import { analyzeWithGemini } from '../../../lib/geminiAnalysis';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    let result: AnalysisResult;

    if (process.env.GEMINI_API_KEY) {
      try {
        result = await analyzeWithGemini(imageUrl);
        if (result && Object.keys(result).length > 0) {
          return NextResponse.json(result);
        }
      } catch (geminiError) {
        console.log('Gemini analysis failed, using fallback:', geminiError);
      }
    }

    result = analyzeImageFromUrl(imageUrl);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Image analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}

