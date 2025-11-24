import { sql } from './index';
import type { ProductBasicInfo } from '../../types';
import { ensureDatabaseInitialized } from './autoInit';

/**
 * Gets all products in ProductBasicInfo format for listings
 * Optimized query that fetches all data in one go
 */
export async function getAllProductsBasicInfo(): Promise<ProductBasicInfo[]> {
  // Try to ensure database is initialized (only once)
  await ensureDatabaseInitialized();
  const { rows } = await sql`
    SELECT 
      p.product_id,
      p.name,
      p.category,
      p.rating_avg,
      p.review_count,
      COALESCE(
        MIN(CASE WHEN v.sale_price IS NOT NULL AND v.sale_price < v.price 
          THEN v.sale_price ELSE v.price END),
        0
      ) as min_price,
      COALESCE(
        json_agg(
          DISTINCT COALESCE(v.main_image_url, i.url)
        ) FILTER (WHERE COALESCE(v.main_image_url, i.url) IS NOT NULL),
        '[]'::json
      ) as images
    FROM products p
    LEFT JOIN variants v ON p.product_id = v.product_id
    LEFT JOIN images i ON v.sku_id = i.sku_id AND i."order" = 1
    GROUP BY p.product_id, p.name, p.category, p.rating_avg, p.review_count
    ORDER BY p.created_at DESC
  `;

  return rows.map((row: Record<string, unknown>) => {
    const images = Array.isArray(row.images) 
      ? row.images.filter((url: string) => url) 
      : [];
    
    return {
      id: row.product_id as string,
      name: row.name as string,
      price: Number(row.min_price) || 0,
      image: images.length > 0 ? images : [],
      category: row.category as string,
      rating: Number(row.rating_avg) || 0,
      reviews: Number(row.review_count) || 0,
    };
  });
}

