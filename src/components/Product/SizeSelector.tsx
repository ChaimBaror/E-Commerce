"use client";

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

interface SizeSelectorProps {
    sizes: string[];
    selectedSize: string | null;
    onSelectSize: (size: string) => void;
    availableSizes?: string[];
}

export default function SizeSelector({
    sizes,
    selectedSize,
    onSelectSize,
    availableSizes
}: SizeSelectorProps) {
    const t = useTranslations('HomePage.productPage');

    const isSizeAvailable = (size: string) => {
        if (!availableSizes) return true;
        return availableSizes.includes(size);
    };

    return (
        <Box>
            <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, mb: 1.5 }}
            >
                {t('selectSize')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {sizes.map((size) => {
                    const isAvailable = isSizeAvailable(size);
                    const isSelected = selectedSize === size;

                    return (
                        <Button
                            key={size}
                            variant={isSelected ? "contained" : "outlined"}
                            onClick={() => isAvailable && onSelectSize(size)}
                            disabled={!isAvailable}
                            sx={{
                                minWidth: { xs: 48, sm: 56 },
                                height: { xs: 40, sm: 44 },
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                fontWeight: isSelected ? 600 : 400,
                                borderColor: isSelected ? 'primary.main' : 'grey.300',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: isSelected ? 'primary.dark' : 'primary.50'
                                },
                                opacity: isAvailable ? 1 : 0.5,
                                cursor: isAvailable ? 'pointer' : 'not-allowed'
                            }}
                        >
                            {size}
                        </Button>
                    );
                })}
            </Box>
        </Box>
    );
}

