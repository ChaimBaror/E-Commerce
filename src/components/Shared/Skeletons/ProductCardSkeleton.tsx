import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

const ProductCardSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 400, width: '100%' }}>
      <Skeleton variant="rectangular" width="100%" height={250} />
      <CardContent>
        <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width={80} height={20} />
        </Box>
        <Skeleton variant="text" width="50%" height={32} />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 2 }} />
          <Skeleton variant="circular" width={36} height={36} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;


