"use client";

import React from 'react';
import { Button, TextField, Stack, CircularProgress } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import ImagePreview from './ImagePreview';

interface ImageUrlTabProps {
    imageUrl: string;
    onUrlChange: (url: string) => void;
    onAnalyze: () => Promise<void>;
    loading: boolean;
    disabled: boolean;
}

const ImageUrlTab: React.FC<ImageUrlTabProps> = ({
    imageUrl,
    onUrlChange,
    onAnalyze,
    loading,
    disabled,
}) => {
    const t = useTranslations('admin.products');

    const isValidUrl = () => {
        if (!imageUrl.trim()) return false;
        try {
            const url = new URL(imageUrl);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
            return false;
        }
    };

    return (
        <Stack spacing={2}>
            <TextField
                label={t('imageUrl')}
                value={imageUrl}
                onChange={(e) => onUrlChange(e.target.value)}
                placeholder="https://example.com/image.jpg"
                fullWidth
                disabled={loading}
            />

            {isValidUrl() && <ImagePreview imageUrl={imageUrl} />}

            <Button
                variant="outlined"
                startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesome />}
                onClick={onAnalyze}
                disabled={disabled || loading || !imageUrl.trim()}
                fullWidth
                sx={{
                    py: 1.5,
                    borderStyle: 'dashed',
                    borderWidth: 2,
                }}
            >
                {loading ? t('analyzing') : t('analyzeFromUrl')}
            </Button>
        </Stack>
    );
};

export default ImageUrlTab;

