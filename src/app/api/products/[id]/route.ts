import { NextRequest, NextResponse } from 'next/server';
import { getProductWithDetails } from '@/lib/db/products';
import type { ExtendedProductData } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const product = await getProductWithDetails(productId);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Convert to ExtendedProductData format
    const variants = product.variants.map(v => ({
      id: v.sku_id,
      color: v.color,
      size: v.size,
      price: v.sale_price && v.sale_price < v.price 
        ? v.sale_price.toString() 
        : v.price.toString(),
      available: v.is_available,
      quantity: v.stock_quantity,
      image: v.main_image_url || (v.images && v.images.length > 0 ? v.images[0].url : ''),
    }));

    const productData: ExtendedProductData = {
      basic_info: {
        id: product.product_id,
        name: product.name,
        price: product.variants.length > 0
          ? Math.min(...product.variants.map(v => v.sale_price && v.sale_price < v.price ? v.sale_price : v.price))
          : 0,
        image: product.variants
          .flatMap(v => [
            ...(v.main_image_url ? [v.main_image_url] : []),
            ...(v.images ? v.images.map(img => img.url) : [])
          ])
          .filter((url, index, self) => self.indexOf(url) === index),
        category: product.category,
        rating: Number(product.rating_avg) || 0,
        reviews: product.review_count || 0,
      },
      description: product.description || '',
      pricing: {
        price: {
          amount: product.variants.length > 0
            ? Math.min(...product.variants.map(v => v.sale_price && v.sale_price < v.price ? v.sale_price : v.price)).toString()
            : '0',
          currency: 'ILS',
        },
        compare_at_price: product.variants.some(v => v.sale_price)
          ? product.variants.find(v => v.sale_price)?.sale_price?.toString() || null
          : null,
      },
      tags: [],
      featured_image: product.variants.find(v => v.main_image_url)?.main_image_url || 
                     product.variants.find(v => v.images && v.images.length > 0)?.images[0]?.url || '',
      variants,
      collections: [],
      inventory_summary: {
        total: product.variants.reduce((sum, v) => sum + v.stock_quantity, 0),
        by_color: product.variants.reduce((acc, v) => {
          acc[v.color] = (acc[v.color] || 0) + v.stock_quantity;
          return acc;
        }, {} as Record<string, number>),
        by_size: product.variants.reduce((acc, v) => {
          acc[v.size] = (acc[v.size] || 0) + v.stock_quantity;
          return acc;
        }, {} as Record<string, number>),
      },
    };

    return NextResponse.json({ product: productData });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

