import { analyzeImageFromUrl, AnalysisResult } from './imageAnalysisUtils';

export async function analyzeProductImage(data: File | string): Promise<AnalysisResult> {
  let response: Response;

  if (typeof data === 'string') {
    // If it's a URL, send JSON
    try {
      response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: data }),
      });

      if (!response.ok) {
        throw new Error('Image analysis API failed');
      }

      const result = await response.json();
      if (result && Object.keys(result).length > 0) {
        return result;
      }
      throw new Error('Empty response from API');
    } catch (error) {
      console.log('Using local image analysis fallback');
      return analyzeImageFromUrl(data);
    }
  } else {
    // If it's a file, send FormData
    try {
      const formData = new FormData();
      formData.append('image', data);

      response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image analysis API failed');
      }

      const result = await response.json();
      if (result && Object.keys(result).length > 0) {
        return result;
      }
      throw new Error('Empty response from API');
    } catch (error) {
      console.log('Using local image analysis fallback');
      // Convert file to data URL for fallback
      const arrayBuffer = await data.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64 = btoa(binary);
      const dataUrl = `data:${data.type};base64,${base64}`;
      return analyzeImageFromUrl(dataUrl);
    }
  }
}

