// This file exports TypeScript types and interfaces used throughout the application to ensure type safety.

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

export interface ProductBasicInfo {
  id: string;
  title: string;
  vendor: string;
  product_type: string;
  handle: string;
  created_at: string;
  published_at: string;
  available_for_sale: boolean;
  total_inventory: number;
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