"use client";

import React, { useState, useEffect } from 'react';
import { Button, Stack, Typography, Paper, Alert } from '@mui/material';
import { ExtendedProductData, ProductVariant } from '../../types';
import { buildProductData } from '../../lib/productBuilder';
import ProductVariantsForm from './ProductVariantsForm';
import ProductBasicInfoFields from './ProductBasicInfoFields';
import ProductPricingFields from './ProductPricingFields';
import ProductMetadataFields from './ProductMetadataFields';
import { useTranslations } from 'next-intl';

interface ProductFormProps {
    productId?: string;
    onSubmit: (product: ExtendedProductData) => void;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productId, onSubmit, onCancel }) => {
    const t = useTranslations('admin.products');
    const [formData, setFormData] = useState({
        title: '',
        vendor: '',
        product_type: '',
        handle: '',
        description: '',
        price_amount: '',
        price_currency: 'USD',
        compare_at_price: '',
        featured_image: '',
        tags: '',
        collections: [] as string[],
    });
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (productId) {
            // TODO: Load product data from API/storage
        }
    }, [productId]);

    const handleFieldChange = (field: string, value: string | string[]) => {
        setFormData({ ...formData, [field]: value });
        setError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.vendor || !formData.price_amount || !formData.description) {
            setError(t('fillAllFields'));
            return;
        }

        const product = buildProductData(formData, variants, productId);
        onSubmit(product);
    };

    return (
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                {productId ? t('editProduct') : t('newProduct')}
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <ProductBasicInfoFields
                        title={formData.title}
                        vendor={formData.vendor}
                        product_type={formData.product_type}
                        handle={formData.handle}
                        description={formData.description}
                        onChange={handleFieldChange}
                    />

                    <ProductPricingFields
                        price_amount={formData.price_amount}
                        price_currency={formData.price_currency}
                        compare_at_price={formData.compare_at_price}
                        onChange={handleFieldChange}
                    />

                    <ProductMetadataFields
                        featured_image={formData.featured_image}
                        tags={formData.tags}
                        collections={formData.collections}
                        onChange={handleFieldChange}
                    />

                    <ProductVariantsForm variants={variants} onChange={setVariants} />

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={onCancel}>
                            {t('cancel')}
                        </Button>
                        <Button type="submit" variant="contained">
                            {productId ? t('update') : t('create')}
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Paper>
    );
};

export default ProductForm;

