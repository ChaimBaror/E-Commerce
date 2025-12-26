import React from 'react';
import {
  Box,
  Typography,
  Fade,
  useTheme,
  alpha
} from '@mui/material';
import ProductCard from './ProductCard';
import { ProductBasicInfo } from '@/types';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useTranslations } from 'next-intl';
import ProductCardSkeleton from '../Shared/Skeletons/ProductCardSkeleton';

interface ProductListProps {
  products: ProductBasicInfo[];
  onAddToCart: (product: ProductBasicInfo) => void;
  onProductClick?: (productId: string) => void;
  loading?: boolean;
}

const ProductList = ({ products, onAddToCart, loading = false, onProductClick }: ProductListProps) => {
  const theme = useTheme();
  const t = useTranslations('HomePage.productList');

  if (loading) {
    return (
      <Box sx={{ py: 2 }}>
        {/* Products Header Skeleton */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 3,
            pb: 2,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          <ShoppingBagIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: 28
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary
            }}
          >
            {t('ourProducts')}
          </Typography>
        </Box>

        {/* Products Grid Skeleton */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(auto-fill, minmax(280px, 1fr))',
              sm: 'repeat(auto-fill, minmax(300px, 1fr))',
              md: 'repeat(auto-fill, minmax(320px, 1fr))',
              lg: 'repeat(auto-fill, minmax(350px, 1fr))'
            },
            gap: { xs: 2, sm: 3, md: 4 },
            justifyItems: 'center',
            '& > *': {
              width: '100%',
              maxWidth: '400px'
            }
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </Box>

        {/* Bottom spacing */}
        <Box sx={{ height: 40 }} />
      </Box>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          textAlign: 'center',
          py: 8,
          px: 2
        }}
      >
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            backgroundColor: alpha(theme.palette.grey[500], 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3
          }}
        >
          <SearchOffIcon
            sx={{
              fontSize: 60,
              color: theme.palette.grey[400]
            }}
          />
        </Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 1
          }}
        >
          {t('noProductsFound')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 400
          }}
        >
          {t('tryDifferentSearch')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      {/* Products Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 3,
          pb: 2,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}
      >
        <ShoppingBagIcon
          sx={{
            color: theme.palette.primary.main,
            fontSize: 28
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary
          }}
        >
          {t('ourProducts')}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            ml: 'auto',
            color: theme.palette.text.secondary,
            fontWeight: 500
          }}
        >
          {products.length} {t('itemsFound', { count: products.length })}
        </Typography>
      </Box>

      {/* Products Grid */}
      <Fade in timeout={600}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(auto-fill, minmax(280px, 1fr))',
              sm: 'repeat(auto-fill, minmax(300px, 1fr))',
              md: 'repeat(auto-fill, minmax(320px, 1fr))',
              lg: 'repeat(auto-fill, minmax(350px, 1fr))'
            },
            gap: { xs: 2, sm: 3, md: 4 },
            justifyItems: 'center',
            '& > *': {
              width: '100%',
              maxWidth: '400px'
            }
          }}
        >
          {products.map((product, index) => (
            <Fade
              key={product.id}
              in
              timeout={800 + index * 100}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Box sx={{ width: '100%' }}>
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onProductClick={onProductClick}
                />
              </Box>
            </Fade>
          ))}
        </Box>
      </Fade>

      {/* Bottom spacing */}
      <Box sx={{ height: 40 }} />
    </Box>
  );
};

export default ProductList;