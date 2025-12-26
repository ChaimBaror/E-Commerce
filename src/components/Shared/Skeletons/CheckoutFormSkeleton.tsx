import React from 'react';
import { Box, Skeleton } from '@mui/material';

const CheckoutFormSkeleton = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {[1, 2, 3, 4].map((i) => (
        <Box key={i}>
          <Skeleton variant="text" width={80} height={20} sx={{ mb: 1 }} />
          <Skeleton variant="rectangular" width="100%" height={i === 3 ? 60 : 40} sx={{ borderRadius: 1 }} />
        </Box>
      ))}
    </Box>
  );
};

export default CheckoutFormSkeleton;


