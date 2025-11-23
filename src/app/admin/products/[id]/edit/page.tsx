"use client";

import React, { useState } from 'react';
import { Container, Alert, Snackbar } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import ProductForm from '../../../../../components/admin/ProductForm';
import { ExtendedProduct } from '../../../../../types';
import { saveProduct } from '../../../../../lib/productStorage';
import { useTranslations } from 'next-intl';

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params.id ? decodeURIComponent(params.id as string) : '';
    const t = useTranslations('admin.products');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (product: ExtendedProduct['product']) => {
        try {
            await saveProduct(product);
            setSuccess(true);
            setTimeout(() => {
                router.push('/admin/products');
            }, 1000);
        } catch (err) {
            setError(err instanceof Error ? err.message : t('saveError'));
        }
    };

    const handleCancel = () => {
        router.push('/admin/products');
    };

    if (!productId) {
        return (
            <Container maxWidth="lg">
                <Alert severity="error">{t('productNotFound')}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <ProductForm productId={productId} onSubmit={handleSubmit} onCancel={handleCancel} />
            <Snackbar
                open={success}
                autoHideDuration={2000}
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    {t('productUpdated')}
                </Alert>
            </Snackbar>
            <Snackbar
                open={!!error}
                autoHideDuration={4000}
                onClose={() => setError('')}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="error" onClose={() => setError('')}>
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
}

