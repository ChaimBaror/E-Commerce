"use client";

import React, { useState, useEffect, useActionState, startTransition } from 'react';
import { Button, Stack, Typography, Paper, Box } from '@mui/material';
import { ExtendedProductData, ProductVariant } from '../../types';
import { buildProductData } from '../../lib/productBuilder';
import { analyzeProductImage } from '../../lib/imageAnalysis';
import ProductVariantsForm from './ProductVariantsForm';
import ProductBasicInfoFields from './ProductBasicInfoFields';
import ProductPricingFields from './ProductPricingFields';
import ProductMetadataFields from './ProductMetadataFields';
import ImageAnalysisButton from './ImageAnalysisButton';
import { useTranslations } from 'next-intl';
import { createProduct, updateProduct, type ActionResult } from '../../app/admin/products/actions';
import toast from 'react-hot-toast';

interface ProductFormProps {
    productId?: string;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productId, onCancel }) => {
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

    const createProductAction = productId
        ? (prevState: ActionResult | null, formData: FormData) => updateProduct(productId, prevState, formData)
        : createProduct;

    const [actionState, formAction, isPending] = useActionState<ActionResult | null, FormData>(
        createProductAction,
        null
    );

    useEffect(() => {
        if (actionState?.error) {
            toast.error(actionState.error);
        } else if (actionState?.success) {
            toast.success(productId ? t('productUpdated') : t('productCreated'));
        }
    }, [actionState, productId, t]);

    useEffect(() => {
        if (productId) {
            const loadProduct = async () => {
                try {
                    const response = await fetch(`/api/products/${productId}`);
                    if (response.ok) {
                        const data = await response.json();
                        const product = data.product as ExtendedProductData;

                        setFormData({
                            title: product.basic_info.name,
                            vendor: '',
                            product_type: product.basic_info.category,
                            handle: '',
                            description: product.description,
                            price_amount: product.pricing.price.amount,
                            price_currency: product.pricing.price.currency,
                            compare_at_price: product.pricing.compare_at_price || '',
                            featured_image: product.featured_image,
                            tags: product.tags.join(', '),
                            collections: product.collections,
                        });

                        setVariants(product.variants);
                    }
                } catch (error) {
                    console.error('Error loading product:', error);
                }
            };
            loadProduct();
        }
    }, [productId]);

    const handleFieldChange = (field: string, value: string | string[]) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleImageAnalysis = async (data: File | string) => {
        try {
            const analysis = await analyzeProductImage(data);

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

            // Update featured_image from analysis result or input data
            const imageUrl = analysis.featured_image_url || (typeof data === 'string' ? data : '');
            if (imageUrl) {
                setFormData(prev => ({ ...prev, featured_image: imageUrl }));
            }

            if (analysis.suggestedVariants && analysis.suggestedVariants.length > 0) {
                const newVariants: ProductVariant[] = analysis.suggestedVariants.map((v: Partial<ProductVariant>, idx: number) => ({
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
            // Error handling will be shown via actionState
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.title || !formData.vendor || !formData.price_amount || !formData.description) {
            toast.error(t('fillAllFields'));
            return;
        }

        const product = buildProductData(formData, variants, productId);
        const formDataObj = new FormData();
        formDataObj.append('productData', JSON.stringify(product));
        
        startTransition(() => {
            formAction(formDataObj);
        });
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
                            disabled={isPending}
                            sx={{ width: { xs: '100%', sm: 'auto' } }}
                        >
                            {isPending ? t('saving') : (productId ? t('update') : t('create'))}
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Paper>
    );
};

export default ProductForm;

