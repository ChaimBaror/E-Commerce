"use client";

import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { useTranslations } from 'next-intl';

interface ProductPricingFieldsProps {
    price_amount: string;
    price_currency: string;
    compare_at_price: string;
    onChange: (field: string, value: string) => void;
}

const ProductPricingFields: React.FC<ProductPricingFieldsProps> = ({
    price_amount,
    price_currency,
    compare_at_price,
    onChange,
}) => {
    const t = useTranslations('admin.products');

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2
        }}>
            <TextField
                label={t('price')}
                type="number"
                value={price_amount}
                onChange={(e) => onChange('price_amount', e.target.value)}
                required
                inputProps={{ min: 0, step: 0.01 }}
                fullWidth
            />
            <TextField
                select
                label={t('currency')}
                value={price_currency}
                onChange={(e) => onChange('price_currency', e.target.value)}
                fullWidth
            >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="ILS">ILS</MenuItem>
            </TextField>
            <TextField
                label={t('compareAtPrice')}
                type="number"
                value={compare_at_price}
                onChange={(e) => onChange('compare_at_price', e.target.value)}
                inputProps={{ min: 0, step: 0.01 }}
                fullWidth
            />
        </Box>
    );
};

export default ProductPricingFields;

