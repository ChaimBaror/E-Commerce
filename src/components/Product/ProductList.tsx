import React from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '@/src/types';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  if (!products || products.length === 0) {
    return <Typography>No products available</Typography>;
  }

  return (
    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={2}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default ProductList;