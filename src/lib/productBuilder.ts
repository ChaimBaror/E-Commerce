import { ExtendedProductData, ProductVariant } from '../types';

interface ProductFormData {
  title: string;
  vendor: string;
  product_type: string;
  handle: string;
  description: string;
  price_amount: string;
  price_currency: string;
  compare_at_price: string;
  featured_image: string;
  tags: string;
  collections: string[];
}

export function buildProductData(
  formData: ProductFormData,
  variants: ProductVariant[],
  productId?: string
): ExtendedProductData {
  const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
  const totalInventory = variants.reduce((sum, v) => sum + v.quantity, 0);
  const byColor: Record<string, number> = {};
  const bySize: Record<string, number> = {};

  variants.forEach(v => {
    byColor[v.color] = (byColor[v.color] || 0) + v.quantity;
    bySize[v.size] = (bySize[v.size] || 0) + v.quantity;
  });

  // Collect unique images from variants and featured image
  const images = new Set<string>();
  if (formData.featured_image) {
    images.add(formData.featured_image);
  }
  variants.forEach(v => {
    if (v.image) {
      images.add(v.image);
    }
  });
  const imageArray = Array.from(images);

  return {
    basic_info: {
      id: productId || `gid://shopify/Product/${Date.now()}`,
      name: formData.title,
      price: parseFloat(formData.price_amount) || 0,
      image: imageArray.length > 0 ? imageArray : (formData.featured_image ? [formData.featured_image] : []),
      category: formData.product_type || 'Uncategorized',
      rating: 0,
      reviews: 0,
    },
    description: formData.description,
    pricing: {
      price: {
        amount: formData.price_amount,
        currency: formData.price_currency,
      },
      compare_at_price: formData.compare_at_price || null,
    },
    tags: tagsArray,
    featured_image: formData.featured_image,
    variants: variants,
    collections: formData.collections,
    inventory_summary: {
      total: totalInventory,
      by_color: byColor,
      by_size: bySize,
    },
  };
}

