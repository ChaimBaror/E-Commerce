import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const HeroBanner = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #673ab7 0%, #2196f3 100%)',
        color: 'white',
        py: 8,
        textAlign: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to My Store
        </Typography>
        <Typography variant="h5" component="h2">
          Discover amazing products at unbeatable prices!
        </Typography>
      </Container>
    </Box>
  );
};

export default HeroBanner;