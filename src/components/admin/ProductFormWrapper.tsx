"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from './ProductForm';
import { ExtendedProductData } from '@/src/types';

interface ProductFormWrapperProps {
    productId?: string;
    onSubmit: (product: ExtendedProductData) => Promise<void>;
    onCancel?: () => void;
}

export default function ProductFormWrapper({ productId, onSubmit, onCancel }: ProductFormWrapperProps) {
    const router = useRouter();

    const handleSubmit = async (product: ExtendedProductData) => {
        await onSubmit(product);
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            router.push('/admin/products');
        }
    };

    return (
        <ProductForm productId={productId} onSubmit={handleSubmit} onCancel={handleCancel} />
    );
}

