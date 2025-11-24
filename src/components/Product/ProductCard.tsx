import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
  Chip
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material';
import { ProductBasicInfo } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
  product: ProductBasicInfo;
  onAddToCart: (product: ProductBasicInfo) => void;
  onProductClick?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onProductClick
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const { isInCart } = useCartStore();
  const t = useTranslations('HomePage');

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }

    if (onProductClick) {
      onProductClick(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: onProductClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: onProductClick ? 'translateY(-4px)' : 'none',
          boxShadow: onProductClick ? 4 : 1,
        }
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={Array.isArray(product.image) ? product.image[0] : product.image}
          alt={product.name}
          sx={{
            objectFit: 'cover',
          }}
        />

        {/* Category Chip */}
        <Chip
          label={product.category}
          size="small"
          color="primary"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(25, 118, 210, 0.9)',
            color: 'white',
            fontSize: '0.7rem',
          }}
        />

        {/* Favorite Button */}
        <IconButton
          onClick={handleFavoriteClick}

          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 1)',
            },
          }}
          size="small"
        >
          {isFavorite ? (
            <FavoriteIcon color="error" fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontSize: '1.1rem',
            fontWeight: 600,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1,
          }}
        >
          {product.name}
        </Typography>


        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {/* <Rating
            value={product.rating}
            readOnly
            precision={0.5}
            size="small"
            sx={{ mr: 1 }}
          /> */}
          <Typography variant="caption" color="text.secondary">
            ({product.reviews})
          </Typography>
        </Box>

        <Typography
          variant="h5"
          color="primary"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          ₪{product.price.toLocaleString()}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant={isInCart(product.id) ? "outlined" : "contained"}
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          sx={{
            fontWeight: 600,
            py: 1.2,
            '&:hover': {
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {isInCart(product.id) ? t('productPage.inCart') : t('addToCart')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;