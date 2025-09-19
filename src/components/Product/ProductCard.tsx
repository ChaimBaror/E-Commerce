import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Snackbar,
  Alert,
  Rating,
  Chip
} from '@mui/material';
import { Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import { Product } from '@/src/types';
import { useTranslations } from 'next-intl';


interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const t = useTranslations('HomePage.products');

  const discount = product.originalPrice
    ? Math.round((((product.originalPrice as number) - (product.price as number)) / (product.originalPrice as number)) * 100)
    : 0;

  const handleAddToCart = () => {
    setShowSnackbar(true);
  };

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box position="relative">
          <CardMedia
            component="img"
            height="240"
            image={product.image}
            alt={product.name}
          />
          <Box position="absolute" top={8} right={8}>
            {discount > 0 && (
              <Chip
                label={`-${discount}%`}
                color="error"
                size="small"
                sx={{ mb: 1, display: 'block' }}
              />
            )}
            <IconButton
              onClick={() => setIsLiked(!isLiked)}
              sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: 'grey.100' } }}
              size="small"
            >
              {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Rating value={typeof product.rating === 'number' ? product.rating : Number(product.rating)} readOnly size="small" />
            <Typography variant="caption" color="text.secondary">
              ({product.reviews} {t('reviews')})
            </Typography>
          </Box>

          <Typography gutterBottom variant="h6" component="h2" noWrap>
            {t(`${product.name}.name`)}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t(`${product.description}`)}
          </Typography>

          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h5" color="primary" component="span" fontWeight="bold">
                ₪{product.price}
              </Typography>
              {(Number(product.originalPrice) ?? 0) > Number(product.price) && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="span"
                  sx={{ textDecoration: 'line-through', ml: 1 }}
                >
                  ₪{product.originalPrice}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>

        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
        >
          {t('addToCart')}
        </Button>
      </Card>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setShowSnackbar(false)}>
          {t('addedToCart')}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;