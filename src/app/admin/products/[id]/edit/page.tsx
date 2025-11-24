import React from 'react';
import { Container, Alert } from '@mui/material';
import { useTranslations } from 'next-intl';
import ProductFormWrapper from '../../../../../components/admin/ProductFormWrapper';

interface EditProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const t = useTranslations('admin.products');
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

