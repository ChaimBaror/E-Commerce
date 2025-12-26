import { sql, getPool } from './index';
import type { Image, CreateImageInput } from '../../types/database';

export async function getImagesBySkuId(skuId: string): Promise<Image[]> {
  const { rows } = await sql<Image>`
    SELECT * FROM images 
    WHERE sku_id = ${skuId}
    ORDER BY "order"
  `;
  return rows;
}

export async function getImageById(imageId: number): Promise<Image | null> {
  const { rows } = await sql<Image>`
    SELECT * FROM images 
    WHERE image_id = ${imageId}
  `;
  return rows[0] || null;
}

export async function createImage(input: CreateImageInput): Promise<Image> {
  const { rows } = await sql<Image>`
    INSERT INTO images (sku_id, url, "order", alt_text)
    VALUES (
      ${input.sku_id}, 
      ${input.url}, 
      ${input.order ?? 1}, 
      ${input.alt_text || null}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function createMultipleImages(
  inputs: CreateImageInput[]
): Promise<Image[]> {
  const images: Image[] = [];
  for (const input of inputs) {
    const image = await createImage(input);
    images.push(image);
  }
  return images;
}

export async function updateImage(
  imageId: number,
  input: Partial<CreateImageInput>
): Promise<Image | null> {
  const updates: string[] = [];
  const values: unknown[] = [];

  if (input.url !== undefined) {
    updates.push(`url = $${values.length + 1}`);
    values.push(input.url);
  }
  if (input.order !== undefined) {
    updates.push(`"order" = $${values.length + 1}`);
    values.push(input.order);
  }
  if (input.alt_text !== undefined) {
    updates.push(`alt_text = $${values.length + 1}`);
    values.push(input.alt_text);
  }

  if (updates.length === 0) {
    return getImageById(imageId);
  }

  values.push(imageId);
  const query = `
    UPDATE images 
    SET ${updates.join(', ')}
    WHERE image_id = $${values.length}
    RETURNING *
  `;

  const pool = getPool();
  const { rows } = await pool.query(query, values);
  return (rows[0] as Image) || null;
}

export async function deleteImage(imageId: number): Promise<boolean> {
  const { rowCount } = await sql`
    DELETE FROM images 
    WHERE image_id = ${imageId}
  `;
  return (rowCount ?? 0) > 0;
}

export async function deleteImagesBySkuId(skuId: string): Promise<number> {
  const { rowCount } = await sql`
    DELETE FROM images 
    WHERE sku_id = ${skuId}
  `;
  return rowCount ?? 0;
}

