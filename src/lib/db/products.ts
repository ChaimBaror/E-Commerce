import { sql, getPool } from './index';
import type {
  Product,
  CreateProductInput,
  ProductWithVariants,
  ProductWithDetails,
} from '../../types/database';

export async function getAllProducts(): Promise<Product[]> {
  const { rows } = await sql<Product>`
    SELECT * FROM products 
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function getProductById(
  productId: string
): Promise<Product | null> {
  const { rows } = await sql<Product>`
    SELECT * FROM products 
    WHERE product_id = ${productId}
  `;
  return rows[0] || null;
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const { rows } = await sql<Product>`
    SELECT * FROM products 
    WHERE category = ${category}
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function getProductWithVariants(
  productId: string
): Promise<ProductWithVariants | null> {
  const product = await getProductById(productId);
  if (!product) return null;

  const { rows: variants } = await sql`
    SELECT 
      v.*,
      COALESCE(
        json_agg(
          json_build_object(
            'image_id', i.image_id,
            'sku_id', i.sku_id,
            'url', i.url,
            'order', i.order,
            'alt_text', i.alt_text,
            'created_at', i.created_at
          ) ORDER BY i.order
        ) FILTER (WHERE i.image_id IS NOT NULL),
        '[]'::json
      ) as images
    FROM variants v
    LEFT JOIN images i ON v.sku_id = i.sku_id
    WHERE v.product_id = ${productId}
    GROUP BY v.sku_id
    ORDER BY v.color, v.size
  `;

  return {
    ...product,
    variants: variants.map((v: Record<string, unknown>) => ({
      ...v,
      images: v.images || [],
    })) as ProductWithVariants['variants'],
  };
}

export async function getProductWithDetails(
  productId: string
): Promise<ProductWithDetails | null> {
  const productWithVariants = await getProductWithVariants(productId);
  if (!productWithVariants) return null;

  const { rows: reviews } = await sql`
    SELECT * FROM reviews 
    WHERE product_id = ${productId}
    ORDER BY created_at DESC
  `;

  return {
    ...productWithVariants,
    reviews: reviews as ProductWithDetails['reviews'],
  };
}

export async function createProduct(
  input: CreateProductInput
): Promise<Product> {
  const { rows } = await sql<Product>`
    INSERT INTO products (name, description, brand, category)
    VALUES (${input.name}, ${input.description || null}, ${input.brand || null}, ${input.category})
    RETURNING *
  `;
  return rows[0];
}

export async function updateProduct(
  productId: string,
  input: Partial<CreateProductInput>
): Promise<Product | null> {
  const updates: string[] = [];
  const values: unknown[] = [];

  if (input.name !== undefined) {
    updates.push(`name = $${values.length + 1}`);
    values.push(input.name);
  }
  if (input.description !== undefined) {
    updates.push(`description = $${values.length + 1}`);
    values.push(input.description);
  }
  if (input.brand !== undefined) {
    updates.push(`brand = $${values.length + 1}`);
    values.push(input.brand);
  }
  if (input.category !== undefined) {
    updates.push(`category = $${values.length + 1}`);
    values.push(input.category);
  }

  if (updates.length === 0) {
    return getProductById(productId);
  }

  values.push(productId);
  const query = `
    UPDATE products 
    SET ${updates.join(', ')}
    WHERE product_id = $${values.length}
    RETURNING *
  `;

  const pool = getPool();
  const { rows } = await pool.query(query, values);
  return (rows[0] as Product) || null;
}

export async function deleteProduct(productId: string): Promise<boolean> {
  const { rowCount } = await sql`
    DELETE FROM products 
    WHERE product_id = ${productId}
  `;
  return (rowCount ?? 0) > 0;
}

