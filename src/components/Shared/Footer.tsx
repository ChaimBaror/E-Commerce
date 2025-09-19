import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} My Store. All rights reserved.
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Link href="/privacy" color="inherit" sx={{ mx: 1 }}>
          Privacy Policy
        </Link>
        <Link href="/terms" color="inherit" sx={{ mx: 1 }}>
          Terms of Service
        </Link>
        <Link href="/contact" color="inherit" sx={{ mx: 1 }}>
          Contact Us
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;