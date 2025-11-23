import React from 'react';
import { Paper, Skeleton, Box, Divider } from '@mui/material';

const OrderSummarySkeleton = () => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Skeleton variant="text" width={150} height={28} sx={{ mb: 2 }} />
      {[1, 2, 3].map((i) => (
        <Box key={i} display="flex" justifyContent="space-between" mb={1}>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width={80} height={20} />
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="space-between">
        <Skeleton variant="text" width={60} height={28} />
        <Skeleton variant="text" width={100} height={28} />
      </Box>
    </Paper>
  );
};

export default OrderSummarySkeleton;

