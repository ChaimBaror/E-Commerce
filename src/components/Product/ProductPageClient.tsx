"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import {
    Box,
    Container,
    Typography,
    Button,
    Rating,
    Chip,
    Stack,
    IconButton,
    Breadcrumbs,
    Link,
    Paper,
    Divider
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    ShoppingCart as ShoppingCartIcon,
    Favorite as FavoriteIcon,
    Share as ShareIcon,
    ArrowBack as ArrowBackIcon,
    FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material';
import { Product } from '@/types';
import Navbar from '@/components/Header/Navbar';
import Footer from '@/components/Shared/Footer';
import { useCartStore } from '@/stores/cartStore';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';
import ProductImageGallery from './ProductImageGallery';

interface ProductPageClientProps {
    product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
    const router = useRouter();
    const { addToCart, getTotalItems } = useCartStore();
    const t = useTranslations('HomePage.productPage');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const handleQuantityChange = (change: number) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        toast.success(`${product.name} ${t('addedToCartSuccess', { quantity })}`);
    };

    const handleBack = () => {
        router.back();
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: product.name,
                    text: product.description,
                    url: window.location.href,
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('הקישור הועתק ללוח');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };


    // Get available sizes and colors from variants
    const availableSizes = product.variants
        ? Array.from(new Set(product.variants
            .filter(v => v.available && (!selectedColor || v.color === selectedColor))
            .map(v => v.size)))
        : product.availableSizes || [];

    const availableColors = product.variants
        ? Array.from(new Set(product.variants
            .filter(v => v.available && (!selectedSize || v.size === selectedSize))
            .map(v => v.color)))
        : product.availableColors || [];

    // Get images based on selected color variant
    const getImagesForColor = () => {
        if (selectedColor && product.variants) {
            const colorVariant = product.variants.find(v => v.color === selectedColor);
            if (colorVariant && colorVariant.image) {
                return [colorVariant.image, ...product.image.filter(img => img !== colorVariant.image)];
            }
        }
        return product.image;
    };

    const productImages = getImagesForColor();
    const defaultSizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const defaultColors = ['Black', 'White', 'Nude', 'Brown', 'Red', 'Blue'];

    // Update images when color changes
    React.useEffect(() => {
        setSelectedImage(0);
    }, [selectedColor]);

    // Get available sizes for selected color
    const getAvailableSizesForColor = () => {
        if (!selectedColor || !product.variants) return availableSizes;
        return product.variants
            .filter(v => v.color === selectedColor && v.available)
            .map(v => v.size);
    };

    // Get available colors for selected size
    const getAvailableColorsForSize = () => {
        if (!selectedSize || !product.variants) return availableColors;
        return product.variants
            .filter(v => v.size === selectedSize && v.available)
            .map(v => v.color);
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#fafafa' }}>
            <Navbar onCartOpen={() => { }} cartItemCount={getTotalItems()} />

            <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, sm: 3 } }}>
                <Breadcrumbs
                    sx={{
                        mb: { xs: 2, md: 3 },
                        '& .MuiBreadcrumbs-ol': {
                            flexWrap: { xs: 'wrap', sm: 'nowrap' }
                        }
                    }}
                    maxItems={3}
                >
                    <Link
                        component="button"
                        variant="body2"
                        onClick={handleBack}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            fontSize: { xs: '0.875rem', sm: '0.875rem' },
                            '&:hover': { textDecoration: 'underline' }
                        }}
                    >
                        <ArrowBackIcon fontSize="small" />
                        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                            {t('backToStore')}
                        </Box>
                    </Link>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            display: { xs: 'none', sm: 'block' }
                        }}
                    >
                        {product.category}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: { xs: '150px', sm: 'none' }
                        }}
                    >
                        {product.name}
                    </Typography>
                </Breadcrumbs>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: { xs: 2, md: 4 }
                }}>
                    <Box>
                        <Paper elevation={2} sx={{ p: { xs: 1, sm: 2 }, bgcolor: 'white' }}>
                            <ProductImageGallery
                                images={productImages}
                                selectedImageIndex={selectedImage}
                                onImageSelect={setSelectedImage}
                                productName={product.name}
                            />
                        </Paper>
                    </Box>

                    <Box>
                        <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'white', height: 'fit-content' }}>
                            <Stack spacing={{ xs: 2, sm: 3 }}>
                                <Chip
                                    label={product.category}
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{
                                        alignSelf: 'flex-start',
                                        fontSize: { xs: '0.75rem', sm: '0.8125rem' }
                                    }}
                                />

                                <Typography
                                    variant="h4"
                                    component="h1"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                                        lineHeight: { xs: 1.3, sm: 1.4 }
                                    }}
                                >
                                    {product.name}
                                </Typography>

                                <Stack
                                    direction="row"
                                    spacing={{ xs: 1, sm: 2 }}
                                    alignItems="center"
                                    flexWrap="wrap"
                                >
                                    <Rating
                                        value={Number(product.rating)}
                                        readOnly
                                        precision={0.1}
                                        size="small"
                                        sx={{
                                            '& .MuiRating-icon': {
                                                fontSize: { xs: '1.25rem', sm: '1.5rem' }
                                            }
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                    >
                                        ({product.reviews} {t('reviews')})
                                    </Typography>
                                </Stack>

                                <Typography
                                    variant="h3"
                                    color="primary"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
                                    }}
                                >
                                    ₪{product.price.toLocaleString()}
                                </Typography>

                                <Divider />

                                <Box>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                                    >
                                        {t('productDescription')}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        lineHeight={1.6}
                                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                                    >
                                        {product.description}
                                    </Typography>
                                </Box>

                                <Divider />

                                {(availableSizes.length > 0 || availableColors.length > 0) && (
                                    <>
                                        {availableColors.length > 0 && (
                                            <ColorSelector
                                                colors={availableColors.length > 0 ? availableColors : defaultColors}
                                                selectedColor={selectedColor}
                                                onSelectColor={handleColorSelect}
                                                availableColors={getAvailableColorsForSize()}
                                            />
                                        )}

                                        {availableSizes.length > 0 && (
                                            <SizeSelector
                                                sizes={availableSizes.length > 0 ? availableSizes : defaultSizes}
                                                selectedSize={selectedSize}
                                                onSelectSize={handleSizeSelect}
                                                availableSizes={getAvailableSizesForColor()}
                                            />
                                        )}
                                        <Divider />
                                    </>
                                )}

                                <Box>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                                    >
                                        {t('quantity')}
                                    </Typography>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 1.5, sm: 2 }}
                                        alignItems={{ xs: 'stretch', sm: 'center' }}
                                        sx={{ mb: 2 }}
                                    >
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                            justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                        >
                                            <IconButton
                                                onClick={() => handleQuantityChange(-1)}
                                                size="medium"
                                                disabled={quantity <= 1}
                                                sx={{
                                                    border: '1px solid',
                                                    borderColor: 'grey.300',
                                                    minWidth: { xs: 44, sm: 32 },
                                                    minHeight: { xs: 44, sm: 32 },
                                                    '&:hover': { borderColor: 'primary.main' },
                                                    '&:active': { transform: 'scale(0.95)' }
                                                }}
                                            >
                                                <RemoveIcon sx={{ fontSize: { xs: '1.25rem', sm: '1rem' } }} />
                                            </IconButton>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    minWidth: { xs: 60, sm: 50 },
                                                    textAlign: 'center',
                                                    py: { xs: 1.5, sm: 1 },
                                                    px: { xs: 3, sm: 2 },
                                                    border: '1px solid',
                                                    borderColor: 'grey.300',
                                                    borderRadius: 1,
                                                    fontSize: { xs: '1.25rem', sm: '1.25rem' }
                                                }}
                                            >
                                                {quantity}
                                            </Typography>
                                            <IconButton
                                                onClick={() => handleQuantityChange(1)}
                                                size="medium"
                                                sx={{
                                                    border: '1px solid',
                                                    borderColor: 'grey.300',
                                                    minWidth: { xs: 44, sm: 32 },
                                                    minHeight: { xs: 44, sm: 32 },
                                                    '&:hover': { borderColor: 'primary.main' },
                                                    '&:active': { transform: 'scale(0.95)' }
                                                }}
                                            >
                                                <AddIcon sx={{ fontSize: { xs: '1.25rem', sm: '1rem' } }} />
                                            </IconButton>
                                        </Stack>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                textAlign: { xs: 'center', sm: 'left' },
                                                fontSize: { xs: '0.875rem', sm: '0.875rem' },
                                                alignSelf: { xs: 'center', sm: 'center' }
                                            }}
                                        >
                                            {t('total')} ₪{(product.price * quantity).toLocaleString()}
                                        </Typography>
                                    </Stack>

                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        startIcon={<ShoppingCartIcon />}
                                        onClick={handleAddToCart}
                                        sx={{
                                            mb: 2,
                                            py: { xs: 1.75, sm: 1.5 },
                                            fontSize: { xs: '1rem', sm: '1.1rem' },
                                            color: '#ffffff',
                                            fontWeight: 600,
                                            minHeight: { xs: 48, sm: 42 },
                                            '&:hover': {
                                                transform: 'translateY(-1px)',
                                                boxShadow: 4,
                                                color: '#ffffff',
                                            },
                                            '&:active': {
                                                transform: 'translateY(0)'
                                            },
                                            transition: 'all 0.2s ease-in-out'
                                        }}
                                    >
                                        {t('addToCart')}
                                    </Button>
                                </Box>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="center"
                                    sx={{ gap: { xs: 1.5, sm: 1 } }}
                                >
                                    <IconButton
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        color={isFavorite ? "error" : "default"}
                                        size="medium"
                                        sx={{
                                            border: '1px solid',
                                            borderColor: isFavorite ? 'error.main' : 'grey.300',
                                            minWidth: { xs: 48, sm: 40 },
                                            minHeight: { xs: 48, sm: 40 },
                                            '&:hover': {
                                                borderColor: isFavorite ? 'error.dark' : 'error.main',
                                                bgcolor: isFavorite ? 'error.50' : 'grey.50'
                                            },
                                            '&:active': { transform: 'scale(0.95)' }
                                        }}
                                    >
                                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    </IconButton>
                                    <IconButton
                                        onClick={handleShare}
                                        size="medium"
                                        sx={{
                                            border: '1px solid',
                                            borderColor: 'grey.300',
                                            minWidth: { xs: 48, sm: 40 },
                                            minHeight: { xs: 48, sm: 40 },
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                bgcolor: 'primary.50'
                                            },
                                            '&:active': { transform: 'scale(0.95)' }
                                        }}
                                    >
                                        <ShareIcon />
                                    </IconButton>
                                </Stack>

                                <Box sx={{ bgcolor: 'grey.50', p: { xs: 1.5, sm: 2 }, borderRadius: 1 }}>
                                    <Stack spacing={1}>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                        >
                                            <strong>קטגוריה:</strong> {product.category}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                        >
                                            <strong>{t('sku')}</strong> {product.id}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                        >
                                            <strong>{t('rating')}</strong> {product.rating}/5 {t('stars')}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Paper>
                    </Box>
                </Box>
            </Container>

            <Footer />
        </Box>
    );
}

