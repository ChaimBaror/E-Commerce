import { ProductVariant } from '../types';

export interface AnalysisResult {
  title?: string;
  description?: string;
  product_type?: string;
  tags?: string[];
  price?: string;
  colors?: string[];
  suggestedVariants?: Partial<ProductVariant>[];
}

export function analyzeImageFromUrl(imageUrl: string): AnalysisResult {
  const urlLower = imageUrl.toLowerCase();
  const tags: string[] = [];
  const colors: string[] = [];

  detectColors(urlLower, colors, tags);
  detectProductTypes(urlLower, tags);

  const suggestedVariants = generateVariants(colors, imageUrl);
  const productType = determineProductType(urlLower);

  return {
    product_type: productType,
    tags: tags.length > 0 ? tags : ['lingerie', 'fashion'],
    colors: colors.length > 0 ? colors : ['Black', 'Nude'],
    suggestedVariants,
  };
}

function detectColors(url: string, colors: string[], tags: string[]): void {
  const colorMap: Record<string, string> = {
    black: 'Black',
    blk: 'Black',
    nude: 'Nude',
    beige: 'Nude',
    brown: 'Brown',
    choco: 'Brown',
    white: 'White',
    red: 'Red',
    blue: 'Blue',
  };

  Object.entries(colorMap).forEach(([key, color]) => {
    if (url.includes(key)) {
      if (!colors.includes(color)) {
        colors.push(color);
      }
      tags.push(key);
    }
  });
}

function detectProductTypes(url: string, tags: string[]): void {
  if (url.includes('bodysuit') || url.includes('bds')) {
    tags.push('bodysuit', 'shapewear');
  }
  if (url.includes('lingerie')) {
    tags.push('lingerie');
  }
  if (url.includes('bra')) {
    tags.push('bra', 'lingerie');
  }
  if (url.includes('panties') || url.includes('underwear')) {
    tags.push('panties', 'lingerie');
  }
}

function generateVariants(colors: string[], imageUrl: string): Partial<ProductVariant>[] {
  const suggestedVariants: Partial<ProductVariant>[] = [];
  const sizes = ['S', 'M', 'L', 'XL'];
  const defaultColors = colors.length > 0 ? colors : ['Black', 'Nude'];

  defaultColors.forEach((color) => {
    sizes.forEach((size) => {
      suggestedVariants.push({
        color,
        size,
        price: '30.0',
        available: true,
        quantity: 2,
        image: imageUrl,
      });
    });
  });

  return suggestedVariants;
}

function determineProductType(url: string): string {
  if (url.includes('bodysuit') || url.includes('bds')) {
    return 'Shapewear';
  }
  if (url.includes('bra')) {
    return 'Bras';
  }
  if (url.includes('panties') || url.includes('underwear')) {
    return 'Panties';
  }
  return 'Lingerie';
}

