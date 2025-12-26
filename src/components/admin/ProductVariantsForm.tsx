"use client";

import React from 'react';
import { Box, Button, Stack, Typography, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ProductVariant } from '../../types';
import VariantItem from './VariantItem';
import { useTranslations } from 'next-intl';

interface ProductVariantsFormProps {
    variants: ProductVariant[];
    onChange: (variants: ProductVariant[]) => void;
}

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Black', 'Nude', 'Brown', 'White', 'Red', 'Blue'];

const ProductVariantsForm: React.FC<ProductVariantsFormProps> = ({
    variants,
    onChange,
}) => {
    const t = useTranslations('admin.products');

    const addVariant = () => {
        const newVariant: ProductVariant = {
            id: `variant-${Date.now()}`,
            color: colors[0],
            size: sizes[0],
            price: '0',
            available: true,
            quantity: 0,
            image: '',
        };
        onChange([...variants, newVariant]);
    };

    const removeVariant = (index: number) => {
        onChange(variants.filter((_, i) => i !== index));
    };

    const updateVariant = (index: number, field: keyof ProductVariant, value: unknown) => {
        const updated = [...variants];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
        <Paper elevation={1} sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: 2 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1, sm: 0 },
            }}>
                <Typography variant="h6" sx={{ mb: { xs: 1, sm: 0 } }}>{t('variants')}</Typography>
                <Button
                    startIcon={<AddIcon />}
                    onClick={addVariant}
                    size="small"
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                    {t('addVariant')}
                </Button>
            </Box>

            <Stack spacing={2}>
                {variants.map((variant, index) => (
                    <VariantItem
                        key={variant.id}
                        variant={variant}
                        index={index}
                        sizes={sizes}
                        colors={colors}
                        onUpdate={(field, value) => updateVariant(index, field, value)}
                        onRemove={() => removeVariant(index)}
                    />
                ))}

                {variants.length === 0 && (
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 3 }}>
                        {t('noVariants')}
                    </Typography>
                )}
            </Stack>
        </Paper>
    );
};

export default ProductVariantsForm;

