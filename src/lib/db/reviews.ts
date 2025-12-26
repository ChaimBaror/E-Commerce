import { sql, getPool } from './index';
import type { Review, CreateReviewInput } from '../../types/database';

export async function getReviewsByProductId(
  productId: string
): Promise<Review[]> {
  const { rows } = await sql<Review>`
    SELECT * FROM reviews 
    WHERE product_id = ${productId}
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function getReviewById(reviewId: number): Promise<Review | null> {
  const { rows } = await sql<Review>`
    SELECT * FROM reviews 
    WHERE review_id = ${reviewId}
  `;
  return rows[0] || null;
}

export async function getReviewsByUserId(userId: string): Promise<Review[]> {
  const { rows } = await sql<Review>`
    SELECT * FROM reviews 
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function createReview(input: CreateReviewInput): Promise<Review> {
  const { rows } = await sql<Review>`
    INSERT INTO reviews (product_id, user_id, rating, review_text)
    VALUES (
      ${input.product_id}, 
      ${input.user_id || null}, 
      ${input.rating}, 
      ${input.review_text || null}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function updateReview(
  reviewId: number,
  input: Partial<CreateReviewInput>
): Promise<Review | null> {
  const updates: string[] = [];
  const values: unknown[] = [];

  if (input.rating !== undefined) {
    updates.push(`rating = $${values.length + 1}`);
    values.push(input.rating);
  }
  if (input.review_text !== undefined) {
    updates.push(`review_text = $${values.length + 1}`);
    values.push(input.review_text);
  }

  if (updates.length === 0) {
    return getReviewById(reviewId);
  }

  values.push(reviewId);
  const query = `
    UPDATE reviews 
    SET ${updates.join(', ')}
    WHERE review_id = $${values.length}
    RETURNING *
  `;

  const pool = getPool();
  const { rows } = await pool.query(query, values);
  return (rows[0] as Review) || null;
}

export async function deleteReview(reviewId: number): Promise<boolean> {
  const { rowCount } = await sql`
    DELETE FROM reviews 
    WHERE review_id = ${reviewId}
  `;
  return (rowCount ?? 0) > 0;
}

