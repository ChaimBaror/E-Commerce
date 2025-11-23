"use client";

import React, { useState, useEffect } from 'react';
import { Button, Stack, Typography, Paper, Alert, Box } from '@mui/material';
import { ExtendedProductData, ProductVariant } from '../../types';
import { buildProductData } from '../../lib/productBuilder';
import { analyzeProductImage } from '../../lib/imageAnalysis';
import ProductVariantsForm from './ProductVariantsForm';
import ProductBasicInfoFields from './ProductBasicInfoFields';
import ProductPricingFields from './ProductPricingFields';
import ProductMetadataFields from './ProductMetadataFields';
import ImageAnalysisButton from './ImageAnalysisButton';
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

    const handleImageAnalysis = async (imageUrl: string) => {
        try {
            const analysis = await analyzeProductImage(imageUrl);

            if (analysis.title) {
                setFormData(prev => ({ ...prev, title: analysis.title! }));
            }
            if (analysis.description) {
                setFormData(prev => ({ ...prev, description: analysis.description! }));
            }
            if (analysis.product_type) {
                setFormData(prev => ({ ...prev, product_type: analysis.product_type! }));
            }
            if (analysis.tags && analysis.tags.length > 0) {
                setFormData(prev => ({ ...prev, tags: analysis.tags!.join(', ') }));
            }
            if (analysis.price) {
                setFormData(prev => ({ ...prev, price_amount: analysis.price! }));
            }
            if (imageUrl) {
                setFormData(prev => ({ ...prev, featured_image: imageUrl }));
            }
            if (analysis.suggestedVariants && analysis.suggestedVariants.length > 0) {
                const newVariants: ProductVariant[] = analysis.suggestedVariants.map((v, idx) => ({
                    id: `variant-${Date.now()}-${idx}`,
                    color: v.color || 'Black',
                    size: v.size || 'M',
                    price: v.price || '30.0',
                    available: v.available ?? true,
                    quantity: v.quantity || 0,
                    image: v.image || imageUrl,
                }));
                setVariants(newVariants);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : t('imageAnalysisError'));
        }
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
        <Paper
            elevation={2}
            sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 3,
                maxWidth: '100%',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h5" fontWeight="bold">
                    {productId ? t('editProduct') : t('newProduct')}
                </Typography>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <ImageAnalysisButton
                        onAnalyze={handleImageAnalysis}
                        disabled={!!productId}
                    />

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

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="flex-end"
                        sx={{ pt: 2 }}
                    >
                        <Button
                            variant="outlined"
                            onClick={onCancel}
                            sx={{ width: { xs: '100%', sm: 'auto' } }}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: { xs: '100%', sm: 'auto' } }}
                        >
                            {productId ? t('update') : t('create')}
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Paper>
    );
};

export default ProductForm;

