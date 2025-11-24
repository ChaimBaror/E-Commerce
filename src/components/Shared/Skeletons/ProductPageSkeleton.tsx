import React from 'react';
import { Box, Container, Skeleton, Paper, Stack } from '@mui/material';

const ProductPageSkeleton = () => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs Skeleton */}
        <Skeleton variant="text" width={200} height={24} sx={{ mb: 3 }} />

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4
        }}>
          {/* Product Images Skeleton */}
          <Box>
            <Paper elevation={2} sx={{ p: 2, bgcolor: 'white' }}>
              <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 1, mb: 2 }} />
              <Stack direction="row" spacing={1} justifyContent="center">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} variant="rectangular" width={60} height={60} sx={{ borderRadius: 1 }} />
                ))}
              </Stack>
            </Paper>
          </Box>

          {/* Product Details Skeleton */}
          <Box>
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'white' }}>
              <Stack spacing={3}>
                <Skeleton variant="rectangular" width={100} height={24} />
                <Skeleton variant="text" width="80%" height={40} />
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Skeleton variant="rectangular" width={120} height={24} />
                  <Skeleton variant="text" width={100} height={20} />
                </Box>
                <Skeleton variant="text" width="50%" height={48} />
                <Skeleton variant="rectangular" width="100%" height={1} />
                <Box>
                  <Skeleton variant="text" width={120} height={28} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="100%" height={60} />
                </Box>
                <Skeleton variant="rectangular" width="100%" height={1} />
                <Box>
                  <Skeleton variant="text" width={80} height={28} sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                    <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="text" width={100} height={24} />
                  </Box>
                  <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 1 }} />
                </Box>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="circular" width={40} height={40} />
                </Box>
                <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                  <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="90%" height={20} />
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Box>

        {/* Related Products Skeleton */}
        <Box sx={{ mt: 6 }}>
          <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            gap: 2
          }}>
            {[1, 2, 3, 4].map((i) => (
              <Paper key={i} elevation={1} sx={{ p: 1 }}>
                <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 1, mb: 1 }} />
                <Skeleton variant="text" width="100%" height={40} />
                <Skeleton variant="text" width="60%" height={24} />
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductPageSkeleton;


