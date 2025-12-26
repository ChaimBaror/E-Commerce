import React from 'react';
import { Box, Container, Skeleton, Paper, Stack } from '@mui/material';
import Navbar from '@/components/Header/Navbar';
import Footer from '@/components/Shared/Footer';

const ProductPageSkeleton = () => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Navbar onCartOpen={() => { }} cartItemCount={0} />
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, sm: 3 } }}>
        {/* Breadcrumbs Skeleton */}
        <Skeleton variant="text" width={200} height={24} sx={{ mb: { xs: 2, md: 3 } }} />

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 2, md: 4 }
        }}>
          {/* Product Images Skeleton */}
          <Box>
            <Paper elevation={2} sx={{ p: { xs: 1, sm: 2 }, bgcolor: 'white' }}>
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
            <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'white', height: 'fit-content' }}>
              <Stack spacing={{ xs: 2, sm: 3 }}>
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

      </Container>
      <Footer />
    </Box>
  );
};

export default ProductPageSkeleton;


