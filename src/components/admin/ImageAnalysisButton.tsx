"use client";

import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { CloudUpload, Link as LinkIcon } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
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
    const [tabValue, setTabValue] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            toast.error(t('invalidImageFile'));
            return;
        }

        setLoading(true);

        try {
            await onAnalyze(file);
            toast.success(t('imageAnalyzed'));
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t('imageAnalysisError'));
        } finally {
            setLoading(false);
        }
    };

    const handleUrlAnalyze = async () => {
        if (!imageUrl.trim()) {
            toast.error(t('enterImageUrl'));
            return;
        }
        try {
            new URL(imageUrl);
        } catch {
            toast.error(t('invalidImageUrl'));
            return;
        }
        setLoading(true);
        try {
            await onAnalyze(imageUrl.trim());
            setImageUrl('');
            toast.success(t('imageAnalyzed'));
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t('imageAnalysisError'));
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
        </Box>
    );
};

export default ImageAnalysisButton;

