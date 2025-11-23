import React from 'react';
import { Stack, Box, Typography, Fade, alpha } from '@mui/material';
import { LocalShipping, Security, Star } from '@mui/icons-material';

interface HeroBannerFeaturesProps {
  mounted: boolean;
}

const features = [
  { icon: <LocalShipping />, text: 'Free Shipping', color: '#10b981' },
  { icon: <Security />, text: 'Secure Payment', color: '#3b82f6' },
  { icon: <Star />, text: 'Premium Quality', color: '#f59e0b' },
];

const HeroBannerFeatures = ({ mounted }: HeroBannerFeaturesProps) => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{ 
        justifyContent: { xs: 'center', md: 'flex-start' },
        alignItems: 'center'
      }}
    >
      {features.map((feature, index) => (
        <Fade 
          key={index} 
          in={mounted} 
          timeout={1500} 
          style={{ transitionDelay: `${600 + index * 200}ms` }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              background: `linear-gradient(135deg, ${alpha(feature.color, 0.2)} 0%, ${alpha(feature.color, 0.1)} 100%)`,
              backdropFilter: 'blur(20px)',
              px: 3,
              py: 1.5,
              borderRadius: 3,
              border: `1px solid ${alpha(feature.color, 0.3)}`,
              boxShadow: `0 4px 20px ${alpha(feature.color, 0.2)}`,
              transition: 'all 0.3s ease',
              cursor: 'default',
              '&:hover': {
                transform: 'translateY(-4px) scale(1.05)',
                boxShadow: `0 8px 30px ${alpha(feature.color, 0.3)}`,
                background: `linear-gradient(135deg, ${alpha(feature.color, 0.3)} 0%, ${alpha(feature.color, 0.2)} 100%)`,
              },
            }}
          >
            <Box
              sx={{
                color: feature.color,
                display: 'flex',
                alignItems: 'center',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              }}
            >
              {feature.icon}
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.95)',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              {feature.text}
            </Typography>
          </Box>
        </Fade>
      ))}
    </Stack>
  );
};

export default HeroBannerFeatures;


