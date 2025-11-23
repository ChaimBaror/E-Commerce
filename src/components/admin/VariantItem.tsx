"use client";

import React from 'react';
import { Box, TextField, Stack, Typography, Paper, MenuItem, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { ProductVariant } from '../../types';
import { useTranslations } from 'next-intl';

interface VariantItemProps {
    variant: ProductVariant;
    index: number;
    sizes: string[];
    colors: string[];
    onUpdate: (field: keyof ProductVariant, value: unknown) => void;
    onRemove: () => void;
}

const VariantItem: React.FC<VariantItemProps> = ({
    variant,
    index,
    sizes,
    colors,
    onUpdate,
    onRemove,
}) => {
    const t = useTranslations('admin.products');

    return (
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle2">{t('variant')} {index + 1}</Typography>
                <IconButton size="small" onClick={onRemove}><DeleteIcon /></IconButton>
            </Box>

            <Stack spacing={2}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2
                }}>
                    <TextField
                        select
                        label={t('color')}
                        value={variant.color}
                        onChange={(e) => onUpdate('color', e.target.value)}
                        size="small"
                        fullWidth
                    >
                        {colors.map((color) => (
                            <MenuItem key={color} value={color}>
                                {color}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label={t('size')}
                        value={variant.size}
                        onChange={(e) => onUpdate('size', e.target.value)}
                        size="small"
                        fullWidth
                    >
                        {sizes.map((size) => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2
                }}>
                    <TextField
                        label={t('price')}
                        type="number"
                        value={variant.price}
                        onChange={(e) => onUpdate('price', e.target.value)}
                        size="small"
                        inputProps={{ min: 0, step: 0.01 }}
                        fullWidth
                    />

                    <TextField
                        label={t('quantity')}
                        type="number"
                        value={variant.quantity}
                        onChange={(e) => onUpdate('quantity', parseInt(e.target.value) || 0)}
                        size="small"
                        inputProps={{ min: 0 }}
                        fullWidth
                    />
                </Box>

                <TextField
                    label={t('imageUrl')}
                    value={variant.image}
                    onChange={(e) => onUpdate('image', e.target.value)}
                    size="small"
                    fullWidth
                />
            </Stack>
        </Paper>
    );
};

export default VariantItem;

