"use client";

import React from 'react';
import { Box, TextField, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';

interface ProductBasicInfoFieldsProps {
    title: string;
    vendor: string;
    product_type: string;
    handle: string;
    description: string;
    onChange: (field: string, value: string) => void;
}

const ProductBasicInfoFields: React.FC<ProductBasicInfoFieldsProps> = ({
    title,
    vendor,
    product_type,
    handle,
    description,
    onChange,
}) => {
    const t = useTranslations('admin.products');

    return (
        <Stack spacing={2}>
            <TextField
                label={t('title')}
                value={title}
                onChange={(e) => onChange('title', e.target.value)}
                fullWidth
                required
            />

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2
            }}>
                <TextField
                    label={t('vendor')}
                    value={vendor}
                    onChange={(e) => onChange('vendor', e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label={t('productType')}
                    value={product_type}
                    onChange={(e) => onChange('product_type', e.target.value)}
                    fullWidth
                />
            </Box>

            <TextField
                label={t('handle')}
                value={handle}
                onChange={(e) => onChange('handle', e.target.value)}
                fullWidth
                helperText={t('handleHelper')}
            />

            <TextField
                label={t('description')}
                value={description}
                onChange={(e) => onChange('description', e.target.value)}
                fullWidth
                required
                multiline
                rows={4}
            />
        </Stack>
    );
};

export default ProductBasicInfoFields;

