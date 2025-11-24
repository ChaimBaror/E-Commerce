"use client";

import React from 'react';
import Image from 'next/image';
import { Box, Stack, IconButton } from '@mui/material';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

interface ProductImageGalleryProps {
    images: string[];
    selectedImageIndex: number;
    onImageSelect: (index: number) => void;
    productName: string;
}

export default function ProductImageGallery({
    images,
    selectedImageIndex,
    onImageSelect,
    productName
}: ProductImageGalleryProps) {
    const handlePrevious = () => {
        const newIndex = selectedImageIndex > 0
            ? selectedImageIndex - 1
            : images.length - 1;
        onImageSelect(newIndex);
    };

    const handleNext = () => {
        const newIndex = selectedImageIndex < images.length - 1
            ? selectedImageIndex + 1
            : 0;
        onImageSelect(newIndex);
    };

    if (images.length === 0) return null;

    const currentImage = images[selectedImageIndex];

    return (
        <Box>
            <Box sx={{ position: 'relative', mb: { xs: 1.5, sm: 2 } }}>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        minHeight: { xs: '250px', sm: '400px' },
                        maxHeight: { xs: '300px', sm: '500px' },
                        borderRadius: '8px',
                        overflow: 'hidden',
                        bgcolor: 'grey.100'
                    }}
                >
                    <Image
                        src={currentImage}
                        alt={`${productName} - Image ${selectedImageIndex + 1}`}
                        width={600}
                        height={500}
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            transition: 'opacity 0.3s ease-in-out'
                        }}
                        onError={(e) => {
                            e.currentTarget.src = images[0];
                        }}
                    />

                    {images.length > 1 && (
                        <>
                            <IconButton
                                onClick={handlePrevious}
                                sx={{
                                    position: 'absolute',
                                    left: { xs: 8, sm: 16 },
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                                    zIndex: 1
                                }}
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                            <IconButton
                                onClick={handleNext}
                                sx={{
                                    position: 'absolute',
                                    right: { xs: 8, sm: 16 },
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                                    zIndex: 1
                                }}
                            >
                                <ChevronRightIcon />
                            </IconButton>
                        </>
                    )}
                </Box>
            </Box>

            {images.length > 1 && (
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    sx={{
                        flexWrap: { xs: 'wrap', sm: 'nowrap' },
                        gap: { xs: 0.75, sm: 1 }
                    }}
                >
                    {images.map((image, index) => (
                        <Box
                            key={index}
                            onClick={() => onImageSelect(index)}
                            sx={{
                                width: { xs: 50, sm: 60 },
                                height: { xs: 50, sm: 60 },
                                minWidth: { xs: 50, sm: 60 },
                                borderRadius: 1,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: selectedImageIndex === index ? 2 : 1,
                                borderColor: selectedImageIndex === index ? 'primary.main' : 'grey.300',
                                opacity: selectedImageIndex === index ? 1 : 0.7,
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    opacity: 1,
                                    borderColor: 'primary.main',
                                    transform: 'scale(1.05)'
                                }
                            }}
                        >
                            <Image
                                src={image}
                                alt={`${productName} thumbnail ${index + 1}`}
                                width={60}
                                height={60}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                                onError={(e) => {
                                    e.currentTarget.src = images[0];
                                }}
                            />
                        </Box>
                    ))}
                </Stack>
            )}
        </Box>
    );
}

