"use server";

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ExtendedProductData } from '@/types';
import { createProduct as createProductDb, updateProduct as updateProductDb } from '@/lib/db/products';
import { createVariant, updateVariant, deleteVariant, getVariantsByProductId } from '@/lib/db/variants';
import { createImage, deleteImagesBySkuId } from '@/lib/db/images';

export type ActionResult = {
    success: boolean;
    error?: string;
};

export async function createProduct(
    _prevState: ActionResult | null,
    formData: FormData
): Promise<ActionResult> {
    try {
        const productData: ExtendedProductData = JSON.parse(formData.get('productData') as string);
        const basicInfo = productData.basic_info as unknown as Record<string, unknown>;
        
        const dbProduct = await createProductDb({
            name: (basicInfo.title as string) || (basicInfo.name as string) || '',
            description: productData.description,
            brand: (basicInfo.vendor as string) || undefined,
            category: (basicInfo.product_type as string) || (basicInfo.category as string) || 'Uncategorized',
        });

        for (const variant of productData.variants) {
            const dbVariant = await createVariant({
                product_id: dbProduct.product_id,
                color: variant.color,
                size: variant.size,
                price: parseFloat(variant.price),
                stock_quantity: variant.quantity,
                sale_price: productData.pricing.compare_at_price 
                    ? parseFloat(productData.pricing.compare_at_price) 
                    : undefined,
                main_image_url: variant.image || productData.featured_image || undefined,
            });

            if (variant.image) {
                const basicInfo = productData.basic_info as unknown as Record<string, unknown>;
                const title = (basicInfo.title as string) || (basicInfo.name as string) || 'Product';
                await createImage({
                    sku_id: dbVariant.sku_id,
                    url: variant.image,
                    order: 1,
                    alt_text: `${title} - ${variant.color} - ${variant.size}`,
                });
            }
        }

        revalidatePath('/admin/products');
        redirect('/admin/products');
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create product',
        };
    }
}

export async function updateProduct(
    productId: string,
    _prevState: ActionResult | null,
    formData: FormData
): Promise<ActionResult> {
    try {
        const productData: ExtendedProductData = JSON.parse(formData.get('productData') as string);
        const basicInfo = productData.basic_info as unknown as Record<string, unknown>;
        
        await updateProductDb(productId, {
            name: (basicInfo.title as string) || (basicInfo.name as string) || '',
            description: productData.description,
            brand: (basicInfo.vendor as string) || undefined,
            category: (basicInfo.product_type as string) || (basicInfo.category as string) || 'Uncategorized',
        });

        const existingVariants = await getVariantsByProductId(productId);
        const processedVariantKeys = new Set<string>();

        for (const variant of productData.variants) {
            const variantKey = `${variant.color}-${variant.size}`;
            const existingVariant = existingVariants.find(
                v => v.color === variant.color && v.size === variant.size
            );

            if (existingVariant) {
                await updateVariant(existingVariant.sku_id, {
                    price: parseFloat(variant.price),
                    stock_quantity: variant.quantity,
                    sale_price: productData.pricing.compare_at_price 
                        ? parseFloat(productData.pricing.compare_at_price) 
                        : undefined,
                    main_image_url: variant.image || productData.featured_image || undefined,
                });
                processedVariantKeys.add(existingVariant.sku_id);
            } else {
                await createVariant({
                    product_id: productId,
                    color: variant.color,
                    size: variant.size,
                    price: parseFloat(variant.price),
                    stock_quantity: variant.quantity,
                    sale_price: productData.pricing.compare_at_price 
                        ? parseFloat(productData.pricing.compare_at_price) 
                        : undefined,
                    main_image_url: variant.image || productData.featured_image || undefined,
                });
            }
        }

        for (const existingVariant of existingVariants) {
            if (!processedVariantKeys.has(existingVariant.sku_id)) {
                await deleteVariant(existingVariant.sku_id);
            }
        }

        revalidatePath('/admin/products');
        redirect('/admin/products');
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update product',
        };
    }
}

export async function deleteProduct(productId: string): Promise<ActionResult> {
    try {
        const { deleteProduct: deleteProductDb } = await import('@/lib/db/products');
        await deleteProductDb(productId);
        revalidatePath('/admin/products');
        redirect('/admin/products');
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete product',
        };
    }
}
