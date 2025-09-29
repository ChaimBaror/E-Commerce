import React from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Fade,
  useTheme,
  alpha
} from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '@/src/types';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick?: (productId: string) => void;
  loading?: boolean;
}

const ProductList = ({ products, onAddToCart, loading = false,onProductClick }: ProductListProps) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '400px',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderTop: `4px solid ${theme.palette.primary.main}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }}
        />
        <Typography variant="h6" color="text.secondary">
          Loading products...
        </Typography>
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
          No Products Found
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: theme.palette.text.secondary,
            maxWidth: 400
          }}
        >
          Try adjusting your filters or browse all categories.
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
          Our Products
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            ml: 'auto',
            color: theme.palette.text.secondary,
            fontWeight: 500
          }}
        >
          {products.length} item{products.length !== 1 ? 's' : ''} found
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