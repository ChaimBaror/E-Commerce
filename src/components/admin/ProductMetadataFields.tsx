"use client";

import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Chip } from '@mui/material';
import { useTranslations } from 'next-intl';

interface ProductMetadataFieldsProps {
    featured_image: string;
    tags: string;
    collections: string[];
    onChange: (field: string, value: string | string[]) => void;
}

const collections = [
    'Bodysuits',
    'Shop All Sexy Lingerie',
    'Black Lingerie',
    'Nude Lingerie',
    'Sexy Shapewear',
    'Americana Lingerie Collection',
    'Basics',
    'Fall Essentials',
    'SALE',
];

const ProductMetadataFields: React.FC<ProductMetadataFieldsProps> = ({
    featured_image,
    tags,
    collections: selectedCollections,
    onChange,
}) => {
    const t = useTranslations('admin.products');

    return (
        <>
            <TextField
                label={t('featuredImage')}
                value={featured_image}
                onChange={(e) => onChange('featured_image', e.target.value)}
                fullWidth
            />

            <TextField
                label={t('tags')}
                value={tags}
                onChange={(e) => onChange('tags', e.target.value)}
                fullWidth
                helperText={t('tagsHelper')}
            />

            <FormControl fullWidth>
                <InputLabel>{t('collections')}</InputLabel>
                <Select
                    multiple
                    value={selectedCollections}
                    onChange={(e) => {
                        const value = e.target.value;
                        onChange('collections', typeof value === 'string' ? value.split(',') : value);
                    }}
                    renderValue={(selected: unknown) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {(selected as string[]).map((value) => (
                                <Chip key={value} label={value} size="small" />
                            ))}
                        </Box>
                    )}
                >
                    {collections.map((collection) => (
                        <MenuItem key={collection} value={collection}>
                            {collection}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default ProductMetadataFields;

