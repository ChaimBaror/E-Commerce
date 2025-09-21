// This file exports TypeScript types and interfaces used throughout the application to ensure type safety.

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
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