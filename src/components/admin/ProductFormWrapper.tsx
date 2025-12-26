"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from './ProductForm';

interface ProductFormWrapperProps {
    productId?: string;
    onCancel?: () => void;
}

export default function ProductFormWrapper({ productId, onCancel }: ProductFormWrapperProps) {
    const router = useRouter();

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            router.push('/admin/products');
        }
    };

    return (
        <ProductForm productId={productId} onCancel={handleCancel} />
    );
}

