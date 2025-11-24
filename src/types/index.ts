// This file exports TypeScript types and interfaces used throughout the application to ensure type safety.

// Detailed product info for product detail page
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string[];
  category: string;
  rating: number | string;
  reviews: number | string;
  description: string;
  // Additional detailed fields
  specifications?: Record<string, string>;
  features?: string[];
  materials?: string[];
  careInstructions?: string;
  shippingInfo?: string;
  returnPolicy?: string;
  inStock?: boolean;
  stockQuantity?: number;
  sku?: string;
  brand?: string;
  tags?: string[];
  // Variants for size and color selection
  variants?: ProductVariant[];
  availableSizes?: string[];
  availableColors?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}
export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Product) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}

export interface ProductVariant {
  id: string;
  color: string;
  size: string;
  price: string;
  available: boolean;
  quantity: number;
  image: string;
}

// Simple product info for listings (products page)
export interface ProductBasicInfo {
  id: string;
  name: string;
  price: number;
  image: string[];
  category: string;
  rating?: number;
  reviews?: number;
}

export interface ProductPricing {
  price: {
    amount: string;
    currency: string;
  };
  compare_at_price: string | null;
}

export interface InventorySummary {
  total: number;
  by_color: Record<string, number>;
  by_size: Record<string, number>;
}

export interface ExtendedProductData {
  basic_info: ProductBasicInfo;
  description: string;
  pricing: ProductPricing;
  tags: string[];
  featured_image: string;
  variants: ProductVariant[];
  collections: string[];
  inventory_summary: InventorySummary;
}

export interface ExtendedProduct {
  product: ExtendedProductData;
}