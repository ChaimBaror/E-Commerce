import React from 'react';
import { Box, Container, Skeleton, Paper, Stack, Card, CardContent } from '@mui/material';

const UserProfileSkeleton = () => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Profile Header Skeleton */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
            <Skeleton variant="circular" width={120} height={120} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width={120} height={24} sx={{ borderRadius: 1, mt: 1 }} />
            </Box>
            <Stack direction="row" spacing={1}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
            </Stack>
          </Stack>
        </Paper>

        {/* Profile Sections Skeleton */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} elevation={2} sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <Skeleton variant="circular" width={32} height={32} />
                  <Skeleton variant="text" width={200} height={32} />
                </Stack>
                {i === 1 || i === 4 ? (
                  <Stack spacing={2}>
                    <Box>
                      <Skeleton variant="text" width={100} height={20} sx={{ mb: 0.5 }} />
                      <Skeleton variant="text" width="80%" height={24} />
                    </Box>
                    <Box>
                      <Skeleton variant="text" width={100} height={20} sx={{ mb: 0.5 }} />
                      <Skeleton variant="text" width="90%" height={24} />
                    </Box>
                    <Box>
                      <Skeleton variant="text" width={100} height={20} sx={{ mb: 0.5 }} />
                      <Skeleton variant="text" width="70%" height={24} />
                    </Box>
                  </Stack>
                ) : i === 2 || i === 3 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Skeleton variant="circular" width={64} height={64} sx={{ mx: 'auto', mb: 2 }} />
                    <Skeleton variant="text" width={200} height={28} sx={{ mx: 'auto', mb: 1 }} />
                    <Skeleton variant="text" width="80%" height={20} sx={{ mx: 'auto', mb: 3 }} />
                    <Skeleton variant="rectangular" width={150} height={36} sx={{ borderRadius: 2, mx: 'auto' }} />
                  </Box>
                ) : (
                  <Stack spacing={2}>
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} variant="rectangular" width="100%" height={48} sx={{ borderRadius: 1 }} />
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfileSkeleton;


