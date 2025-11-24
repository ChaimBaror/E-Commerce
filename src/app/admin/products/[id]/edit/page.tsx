import React from 'react';
import { Container } from '@mui/material';
import ProductFormWrapper from '../../../../../components/admin/ProductFormWrapper';

interface EditProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const resolvedParams = await params;
    const productId = resolvedParams.id ? decodeURIComponent(resolvedParams.id) : '';

    if (!productId) {
        return (
            <Container maxWidth="lg">
                <div>Product not found</div>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <ProductFormWrapper productId={productId} />
        </Container>
    );
}

