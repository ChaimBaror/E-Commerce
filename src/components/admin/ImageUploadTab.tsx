"use client";

import React, { useRef } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import { useTranslations } from 'next-intl';

interface ImageUploadTabProps {
    onUpload: (file: File) => Promise<void>;
    loading: boolean;
    disabled: boolean;
}

const ImageUploadTab: React.FC<ImageUploadTabProps> = ({
    onUpload,
    loading,
    disabled,
}) => {
    const t = useTranslations('admin.products');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await onUpload(file);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <Button
                variant="outlined"
                startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesome />}
                onClick={handleClick}
                disabled={disabled || loading}
                fullWidth
                sx={{
                    py: 1.5,
                    borderStyle: 'dashed',
                    borderWidth: 2,
                }}
            >
                {loading ? t('analyzing') : t('uploadAndAnalyze')}
            </Button>
        </>
    );
};

export default ImageUploadTab;

