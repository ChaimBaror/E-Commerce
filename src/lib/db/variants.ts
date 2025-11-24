import { sql, getPool } from './index';
import type { Variant, CreateVariantInput, VariantWithImages } from '../../types/database';

export async function getVariantById(skuId: string): Promise<Variant | null> {
  const { rows } = await sql<Variant>`
    SELECT * FROM variants 
    WHERE sku_id = ${skuId}
  `;
  return rows[0] || null;
}

export async function getVariantsByProductId(
  productId: string
): Promise<Variant[]> {
  const { rows } = await sql<Variant>`
    SELECT * FROM variants 
    WHERE product_id = ${productId}
    ORDER BY color, size
  `;
  return rows;
}

export async function getVariantWithImages(
  skuId: string
): Promise<VariantWithImages | null> {
  const variant = await getVariantById(skuId);
  if (!variant) return null;

  const { rows: images } = await sql`
    SELECT * FROM images 
    WHERE sku_id = ${skuId}
    ORDER BY "order"
  `;

  return {
    ...variant,
    images: images as VariantWithImages['images'],
  };
}

export async function getAvailableVariants(
  productId: string
): Promise<Variant[]> {
  const { rows } = await sql<Variant>`
    SELECT * FROM variants 
    WHERE product_id = ${productId} 
    AND is_available = true 
    AND stock_quantity > 0
    ORDER BY color, size
  `;
  return rows;
}

export async function createVariant(
  input: CreateVariantInput
): Promise<Variant> {
  const { rows } = await sql<Variant>`
    INSERT INTO variants (
      product_id, color, size, price, 
      stock_quantity, sale_price, main_image_url
    )
    VALUES (
      ${input.product_id}, 
      ${input.color}, 
      ${input.size}, 
      ${input.price},
      ${input.stock_quantity ?? 0},
      ${input.sale_price || null},
      ${input.main_image_url || null}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function updateVariant(
  skuId: string,
  input: Partial<CreateVariantInput>
): Promise<Variant | null> {
  const updates: string[] = [];
  const values: unknown[] = [];

  if (input.color !== undefined) {
    updates.push(`color = $${values.length + 1}`);
    values.push(input.color);
  }
  if (input.size !== undefined) {
    updates.push(`size = $${values.length + 1}`);
    values.push(input.size);
  }
  if (input.price !== undefined) {
    updates.push(`price = $${values.length + 1}`);
    values.push(input.price);
  }
  if (input.stock_quantity !== undefined) {
    updates.push(`stock_quantity = $${values.length + 1}`);
    values.push(input.stock_quantity);
    updates.push(`is_available = $${values.length + 1}`);
    values.push(input.stock_quantity > 0);
  }
  if (input.sale_price !== undefined) {
    updates.push(`sale_price = $${values.length + 1}`);
    values.push(input.sale_price);
  }
  if (input.main_image_url !== undefined) {
    updates.push(`main_image_url = $${values.length + 1}`);
    values.push(input.main_image_url);
  }

  if (updates.length === 0) {
    return getVariantById(skuId);
  }

  values.push(skuId);
  const query = `
    UPDATE variants 
    SET ${updates.join(', ')}
    WHERE sku_id = $${values.length}
    RETURNING *
  `;

  const pool = getPool();
  const { rows } = await pool.query(query, values);
  return (rows[0] as Variant) || null;
}

export async function deleteVariant(skuId: string): Promise<boolean> {
  const { rowCount } = await sql`
    DELETE FROM variants 
    WHERE sku_id = ${skuId}
  `;
  return (rowCount ?? 0) > 0;
}

