import { analyzeImageFromUrl, AnalysisResult } from './imageAnalysisUtils';

export async function analyzeProductImage(imageUrl: string): Promise<AnalysisResult> {
  try {
    const response = await fetch('/api/analyze-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      throw new Error('Image analysis API failed');
    }

    const data = await response.json();
    if (data && Object.keys(data).length > 0) {
      return data;
    }
    throw new Error('Empty response from API');
  } catch (error) {
    console.log('Using local image analysis fallback');
    return analyzeImageFromUrl(imageUrl);
  }
}

