import React from 'react';
import { Container, Alert } from '@mui/material';
import { useTranslations } from 'next-intl';
import ProductFormWrapper from '../../../../../components/admin/ProductFormWrapper';
import { updateProduct } from '../../actions';

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
                <Alert severity="error">{t('productNotFound')}</Alert>
            </Container>
        );
    }

    const handleSubmit = async (product: Parameters<typeof updateProduct>[1]) => {
        await updateProduct(productId, product);
    };

    return (
        <Container maxWidth="lg">
            <ProductFormWrapper productId={productId} onSubmit={handleSubmit} />
        </Container>
    );
}

