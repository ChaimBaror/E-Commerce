"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Grid,
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

interface ProductPageProps {
  productId: string;
  onAddToCart?: (product: Product, quantity: number) => void;
  onBack?: () => void;
  cartItemCount?: number;
}

const ProductPage: React.FC<ProductPageProps> = ({ 
  productId, 
  onAddToCart,
  onBack,
  cartItemCount = 0
}) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Find product by ID
    const foundProduct = allProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [productId]);

  if (loading) {
    return (
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <Navbar onCartOpen={() => {}} cartItemCount={cartItemCount} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" align="center">
            טוען...
          </Typography>
        </Container>
        <Footer />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <Navbar onCartOpen={() => {}} cartItemCount={cartItemCount} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" align="center" color="error">
            מוצר לא נמצא
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button 
              variant="contained" 
              onClick={() => router.push('/')}
              startIcon={<ArrowBackIcon />}
            >
              חזרה לחנות
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
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
    setShowSuccessMessage(true);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
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
      <Navbar onCartOpen={() => {}} cartItemCount={cartItemCount} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
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
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            <ArrowBackIcon fontSize="small" />
            חזרה לחנות
          </Link>
          <Typography variant="body2" color="text.secondary">
            {product.category}
          </Typography>
          <Typography variant="body2" color="primary">
            {product.name}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, bgcolor: 'white' }}>
              <Box sx={{ mb: 2 }}>
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '400px',
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
              <Stack direction="row" spacing={1} justifyContent="center">
                {productImages.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: selectedImage === index ? 2 : 1,
                      borderColor: selectedImage === index ? 'primary.main' : 'grey.300',
                      '&:hover': { borderColor: 'primary.main' }
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
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
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'white', height: 'fit-content' }}>
              <Stack spacing={3}>
                {/* Category Chip */}
                <Chip 
                  label={product.category} 
                  variant="outlined" 
                  color="primary"
                  size="small"
                  sx={{ alignSelf: 'flex-start' }}
                />

                {/* Product Name */}
                <Typography variant="h4" component="h1" fontWeight="bold">
                  {product.name}
                </Typography>

                {/* Rating and Reviews */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Rating value={product.rating} readOnly precision={0.1} />
                  <Typography variant="body2" color="text.secondary">
                    ({product.reviews} ביקורות)
                  </Typography>
                </Stack>

                {/* Price */}
                <Typography variant="h3" color="primary" fontWeight="bold">
                  ₪{product.price.toLocaleString()}
                </Typography>

                <Divider />

                {/* Description */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    תיאור המוצר
                  </Typography>
                  <Typography variant="body1" color="text.secondary" lineHeight={1.6}>
                    {product.description}
                  </Typography>
                </Box>

                <Divider />

                {/* Quantity and Add to Cart */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    כמות
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton 
                        onClick={() => handleQuantityChange(-1)}
                        size="small"
                        disabled={quantity <= 1}
                        sx={{ 
                          border: '1px solid',
                          borderColor: 'grey.300',
                          '&:hover': { borderColor: 'primary.main' }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          minWidth: 50, 
                          textAlign: 'center',
                          py: 1,
                          px: 2,
                          border: '1px solid',
                          borderColor: 'grey.300',
                          borderRadius: 1
                        }}
                      >
                        {quantity}
                      </Typography>
                      <IconButton 
                        onClick={() => handleQuantityChange(1)}
                        size="small"
                        sx={{ 
                          border: '1px solid',
                          borderColor: 'grey.300',
                          '&:hover': { borderColor: 'primary.main' }
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                    
                    <Typography variant="body2" color="text.secondary">
                      סה"כ: ₪{(product.price * quantity).toLocaleString()}
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
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: 4
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    הוסף לעגלה
                  </Button>
                </Box>

                {/* Action Buttons */}
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton
                    onClick={() => setIsFavorite(!isFavorite)}
                    color={isFavorite ? "error" : "default"}
                    sx={{ 
                      border: '1px solid',
                      borderColor: isFavorite ? 'error.main' : 'grey.300',
                      '&:hover': { 
                        borderColor: isFavorite ? 'error.dark' : 'error.main',
                        bgcolor: isFavorite ? 'error.50' : 'grey.50'
                      }
                    }}
                  >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <IconButton 
                    onClick={handleShare}
                    sx={{ 
                      border: '1px solid',
                      borderColor: 'grey.300',
                      '&:hover': { 
                        borderColor: 'primary.main',
                        bgcolor: 'primary.50'
                      }
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Stack>

                {/* Product Info */}
                <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      <strong>קטגוריה:</strong> {product.category}
                    </Typography>
                    <Typography variant="body2">
                      <strong>מק"ט:</strong> {product.id}
                    </Typography>
                    <Typography variant="body2">
                      <strong>דירוג:</strong> {product.rating}/5 כוכבים
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Related Products Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            מוצרים דומים
          </Typography>
          <Grid container spacing={2}>
            {allProducts
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Grid item xs={6} sm={3} key={relatedProduct.id}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 1, 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': { 
                        elevation: 4,
                        transform: 'translateY(-2px)'
                      }
                    }}
                    onClick={() => handleRelatedProductClick(relatedProduct.id)}
                  >
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      style={{
                        width: '100%',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mt: 1, 
                        fontWeight: 500,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {relatedProduct.name}
                    </Typography>
                    <Typography variant="body2" color="primary" fontWeight="bold">
                      ₪{relatedProduct.price.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
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
          {product.name} נוסף לעגלה בהצלחה! (כמות: {quantity})
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductPage;