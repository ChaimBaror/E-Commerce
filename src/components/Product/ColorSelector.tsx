"use client";

import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { useTranslations } from 'next-intl';

interface ColorSelectorProps {
    colors: string[];
    selectedColor: string | null;
    onSelectColor: (color: string) => void;
    availableColors?: string[];
}

const colorMap: Record<string, string> = {
    Black: '#000000',
    White: '#FFFFFF',
    Nude: '#E3C9A6',
    Brown: '#8B4513',
    Red: '#FF0000',
    Blue: '#0000FF',
    Pink: '#FFC0CB',
    Gray: '#808080',
    Grey: '#808080'
};

export default function ColorSelector({
    colors,
    selectedColor,
    onSelectColor,
    availableColors
}: ColorSelectorProps) {
    const t = useTranslations('HomePage.productPage');

    const isColorAvailable = (color: string) => {
        if (!availableColors) return true;
        return availableColors.includes(color);
    };

    const getColorValue = (color: string) => {
        return colorMap[color] || colorMap[color.toLowerCase()] || '#CCCCCC';
    };

    return (
        <Box>
            <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, mb: 1.5 }}
            >
                {t('selectColor')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {colors.map((color) => {
                    const isAvailable = isColorAvailable(color);
                    const isSelected = selectedColor === color;
                    const colorValue = getColorValue(color);

                    return (
                        <Tooltip key={color} title={color} arrow>
                            <Box
                                onClick={() => isAvailable && onSelectColor(color)}
                                sx={{
                                    width: { xs: 40, sm: 48 },
                                    height: { xs: 40, sm: 48 },
                                    borderRadius: '50%',
                                    bgcolor: colorValue,
                                    border: isSelected ? 3 : 2,
                                    borderColor: isSelected ? 'primary.main' : 'grey.300',
                                    cursor: isAvailable ? 'pointer' : 'not-allowed',
                                    opacity: isAvailable ? 1 : 0.5,
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': isAvailable ? {
                                        transform: 'scale(1.1)',
                                        borderColor: 'primary.main',
                                        boxShadow: 2
                                    } : {},
                                    position: 'relative',
                                    '&::after': isSelected ? {
                                        content: '""',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: { xs: 16, sm: 20 },
                                        height: { xs: 16, sm: 20 },
                                        borderRadius: '50%',
                                        bgcolor: 'white',
                                        border: '2px solid',
                                        borderColor: 'primary.main'
                                    } : {}
                                }}
                            />
                        </Tooltip>
                    );
                })}
            </Box>
        </Box>
    );
}

