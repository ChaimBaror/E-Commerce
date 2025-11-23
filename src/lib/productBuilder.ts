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

  return {
    basic_info: {
      id: productId || `gid://shopify/Product/${Date.now()}`,
      title: formData.title,
      vendor: formData.vendor,
      product_type: formData.product_type,
      handle: formData.handle || formData.title.toLowerCase().replace(/\s+/g, '-'),
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      available_for_sale: true,
      total_inventory: totalInventory,
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

