"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
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
  Divider,
  Alert,
  Snackbar
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
import { Product } from '@/src/types';
import { allProducts } from '@/src/data/data';
import Navbar from '@/src/components/Header/Navbar';
import Footer from '@/src/components/Shared/Footer';
import { useCartStore } from '@/src/stores/cartStore';
import ProductPageSkeleton from '@/src/components/Shared/Skeletons/ProductPageSkeleton';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const router = useRouter();
  const { addToCart, getTotalItems } = useCartStore();
  const t = useTranslations('HomePage.productPage');
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      const resolvedParams = await params;
      
      // Find product by ID
      const foundProduct = allProducts.find(p => p.id === resolvedParams.id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    };
    
    loadProduct();
  }, [params]);

  if (loading) {
    return (
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <Navbar onCartOpen={() => {}} cartItemCount={getTotalItems()} />
        <ProductPageSkeleton />
        <Footer />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <Navbar onCartOpen={() => {}} cartItemCount={getTotalItems()} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" align="center" color="error">
            {t('productNotFound')}
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button 
              variant="contained" 
              onClick={() => router.push('/')}
              startIcon={<ArrowBackIcon />}
            >
              {t('backToStore')}
            </Button>
          </Box>
        </Container>
        <Footer />
      </Box>
    );
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    // Add the product to cart with the specified quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setShowSuccessMessage(true);
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
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        alert('הקישור הועתק ללוח');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRelatedProductClick = (relatedProductId: string) => {
    router.push(`/product/${relatedProductId}`);
  };

  // Generate additional product images with variations
  const productImages = [
    product.image,
    product.image.includes('?') 
      ? product.image + '&w=600&h=600&fit=crop&crop=center'
      : product.image + '?w=600&h=600&fit=crop&crop=center',
    product.image.includes('?')
      ? product.image + '&w=600&h=600&fit=crop&crop=left' 
      : product.image + '?w=600&h=600&fit=crop&crop=left',
  ];

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Navbar onCartOpen={() => {}} cartItemCount={getTotalItems()} />
      
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, sm: 3 } }}>
        {/* Breadcrumbs */}
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
          {/* Product Images */}
          <Box>
            <Paper elevation={2} sx={{ p: { xs: 1, sm: 2 }, bgcolor: 'white' }}>
              <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
                <Image
                  src={productImages[selectedImage]}
                  alt={product.name}
                  width={600}
                  height={400}
                  style={{
                    width: '100%',
                    height: 'auto',
                    minHeight: '250px',
                    maxHeight: '400px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                  onError={(e) => {
                    // Fallback to original image if modified version fails
                    e.currentTarget.src = product.image;
                  }}
                />
              </Box>
              
              {/* Thumbnail images */}
              <Stack 
                direction="row" 
                spacing={1} 
                justifyContent="center"
                sx={{ 
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  gap: { xs: 0.75, sm: 1 }
                }}
              >
                {productImages.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: { xs: 50, sm: 60 },
                      height: { xs: 50, sm: 60 },
                      minWidth: { xs: 50, sm: 60 },
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: selectedImage === index ? 2 : 1,
                      borderColor: selectedImage === index ? 'primary.main' : 'grey.300',
                      '&:active': { 
                        transform: 'scale(0.95)',
                        transition: 'transform 0.1s'
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={60}
                      height={60}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.currentTarget.src = product.image;
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Box>

          {/* Product Details */}
          <Box>
            <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'white', height: 'fit-content' }}>
              <Stack spacing={{ xs: 2, sm: 3 }}>
                {/* Category Chip */}
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

                {/* Product Name */}
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

                {/* Rating and Reviews */}
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

                {/* Price */}
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

                {/* Description */}
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

                {/* Quantity and Add to Cart */}
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

                {/* Action Buttons */}
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

                {/* Product Info */}
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

        {/* Related Products Section */}
        <Box sx={{ mt: { xs: 4, sm: 6 } }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            fontWeight="bold"
            sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              mb: { xs: 2, sm: 3 }
            }}
          >
            {t('relatedProducts')}
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 1.5, sm: 2 }
          }}>
            {allProducts
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Paper 
                  key={relatedProduct.id}
                  elevation={1} 
                  sx={{ 
                    p: { xs: 0.75, sm: 1 }, 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': { 
                      elevation: 4,
                      transform: 'translateY(-2px)'
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      elevation: 2
                    }
                  }}
                  onClick={() => handleRelatedProductClick(relatedProduct.id)}
                >
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    width={200}
                    height={120}
                    style={{
                      width: '100%',
                      height: 'auto',
                      minHeight: '100px',
                      maxHeight: '120px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: { xs: 0.75, sm: 1 }, 
                      mb: { xs: 0.5, sm: 0.75 },
                      fontWeight: 500,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: { xs: '2.5em', sm: '2.5em' }
                    }}
                  >
                    {relatedProduct.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="primary" 
                    fontWeight="bold"
                    sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}
                  >
                    ₪{relatedProduct.price.toLocaleString()}
                  </Typography>
                </Paper>
              ))}
          </Box>
        </Box>
      </Container>

      <Footer />

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={3000}
        onClose={() => setShowSuccessMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccessMessage(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {product.name} {t('addedToCartSuccess', { quantity })}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductPage;