// Database types matching PostgreSQL schema

export interface Product {
  product_id: string;
  name: string;
  description: string | null;
  brand: string | null;
  category: string;
  rating_avg: number;
  review_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface Variant {
  sku_id: string;
  product_id: string;
  color: string;
  size: string;
  price: number;
  stock_quantity: number;
  is_available: boolean;
  sale_price: number | null;
  main_image_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Image {
  image_id: number;
  sku_id: string;
  url: string;
  order: number;
  alt_text: string | null;
  created_at: Date;
}

export interface Review {
  review_id: number;
  product_id: string;
  user_id: string | null;
  rating: number;
  review_text: string | null;
  created_at: Date;
  updated_at: Date;
}

// Extended types for API responses
export interface ProductWithVariants extends Product {
  variants: VariantWithImages[];
}

export interface VariantWithImages extends Variant {
  images: Image[];
}

export interface ProductWithDetails extends Product {
  variants: VariantWithImages[];
  reviews: Review[];
}

// Input types for creating/updating
export interface CreateProductInput {
  name: string;
  description?: string;
  brand?: string;
  category: string;
}

export interface CreateVariantInput {
  product_id: string;
  color: string;
  size: string;
  price: number;
  stock_quantity?: number;
  sale_price?: number;
  main_image_url?: string;
}

export interface CreateImageInput {
  sku_id: string;
  url: string;
  order?: number;
  alt_text?: string;
}

export interface CreateReviewInput {
  product_id: string;
  user_id?: string;
  rating: number;
  review_text?: string;
}

