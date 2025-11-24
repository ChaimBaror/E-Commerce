"use server";

import { redirect } from 'next/navigation';
import { ExtendedProductData } from '@/src/types';

export async function createProduct(product: ExtendedProductData) {
    // TODO: Implement API call to create product
    console.log('Creating product:', product);
    redirect('/admin/products');
}

export async function updateProduct(productId: string, product: ExtendedProductData) {
    // TODO: Implement API call to update product
    console.log('Updating product:', productId, product);
    redirect('/admin/products');
}

export async function deleteProduct(productId: string) {
    // TODO: Implement API call to delete product
    console.log('Deleting product:', productId);
    redirect('/admin/products');
}
