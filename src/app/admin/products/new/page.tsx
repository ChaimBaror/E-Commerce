"use client";

import React from 'react';
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import ProductForm from '../../../../components/admin/ProductForm';
import { ExtendedProductData } from '../../../../types';

export default function NewProductPage() {
    const router = useRouter();

    const handleSubmit = (product: ExtendedProductData) => {
        // TODO: Implement API call to create product
        console.log('Creating product:', product);
        // After successful creation, redirect to products list
        router.push('/admin/products');
    };

    const handleCancel = () => {
        router.push('/admin/products');
    };

    return (
        <Container maxWidth="md">
            <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </Container>
    );
}

