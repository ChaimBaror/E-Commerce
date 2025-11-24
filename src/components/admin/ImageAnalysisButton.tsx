"use client";

import React, { useState } from 'react';
import { Box, Tabs, Tab, Alert } from '@mui/material';
import { CloudUpload, Link as LinkIcon } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import ImageUploadTab from './ImageUploadTab';
import ImageUrlTab from './ImageUrlTab';

interface ImageAnalysisButtonProps {
    onAnalyze: (data: File | string) => Promise<void>;
    disabled?: boolean;
}

const ImageAnalysisButton: React.FC<ImageAnalysisButtonProps> = ({
    onAnalyze,
    disabled = false,
}) => {
    const t = useTranslations('admin.products');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError(t('invalidImageFile'));
            return;
        }

        setLoading(true);
        setError('');

        try {
            await onAnalyze(file);
        } catch (err) {
            setError(err instanceof Error ? err.message : t('imageAnalysisError'));
        } finally {
            setLoading(false);
        }
    };

    const handleUrlAnalyze = async () => {
        if (!imageUrl.trim()) {
            setError(t('enterImageUrl'));
            return;
        }
        try {
            new URL(imageUrl);
        } catch {
            setError(t('invalidImageUrl'));
            return;
        }
        setLoading(true);
        setError('');
        try {
            await onAnalyze(imageUrl.trim());
            setImageUrl('');
        } catch (err) {
            setError(err instanceof Error ? err.message : t('imageAnalysisError'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
                <Tab icon={<CloudUpload />} label={t('uploadFile')} />
                <Tab icon={<LinkIcon />} label={t('enterUrl')} />
            </Tabs>

            {tabValue === 0 && (
                <ImageUploadTab
                    onUpload={handleFileUpload}
                    loading={loading}
                    disabled={disabled}
                />
            )}

            {tabValue === 1 && (
                <ImageUrlTab
                    imageUrl={imageUrl}
                    onUrlChange={setImageUrl}
                    onAnalyze={handleUrlAnalyze}
                    loading={loading}
                    disabled={disabled}
                />
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError('')}>
                    {error}
                </Alert>
            )}
        </Box>
    );
};

export default ImageAnalysisButton;

