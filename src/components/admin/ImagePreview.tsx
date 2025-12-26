"use client";

import React, { useState, useEffect } from 'react';
import { Box, Paper, CircularProgress, Stack, Typography } from '@mui/material';
import { BrokenImage } from '@mui/icons-material';
import { useTranslations } from 'next-intl';

interface ImagePreviewProps {
    imageUrl: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
    const t = useTranslations('admin.products');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (!imageUrl.trim()) {
            setError(false);
            setLoading(false);
            setImageLoaded(false);
            return;
        }
        setLoading(true);
        setError(false);
        setImageLoaded(false);

        const img = new Image();
        img.onload = () => {
            setLoading(false);
            setError(false);
            setImageLoaded(true);
        };
        img.onerror = () => {
            setLoading(false);
            setError(true);
            setImageLoaded(false);
        };
        img.src = imageUrl;
    }, [imageUrl]);

    const handleImageLoad = () => {
        if (!imageLoaded) {
            setLoading(false);
            setError(false);
            setImageLoaded(true);
        }
    };

    const handleImageError = () => {
        setLoading(false);
        setError(true);
        setImageLoaded(false);
    };

    if (!imageUrl.trim()) return null;

    return (
        <Paper
            elevation={1}
            sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 200,
                bgcolor: 'grey.50',
                borderRadius: 2,
                position: 'relative',
            }}
        >
            {loading && !error && (
                <CircularProgress size={40} sx={{ position: 'absolute' }} />
            )}
            {!error && (
                <Box
                    component="img"
                    src={imageUrl}
                    alt={t('imagePreview')}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    sx={{
                        maxWidth: '100%',
                        maxHeight: 300,
                        objectFit: 'contain',
                        borderRadius: 1,
                        opacity: imageLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                    }}
                />
            )}
            {error && (
                <Stack spacing={1} alignItems="center">
                    <BrokenImage sx={{ fontSize: 48, color: 'error.main' }} />
                    <Typography variant="body2" color="error">
                        {t('imageLoadError')}
                    </Typography>
                </Stack>
            )}
        </Paper>
    );
};

export default ImagePreview;

