import React from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { FlashOn } from '@mui/icons-material';
import HeroBannerButtons from './HeroBannerButtons';
import HeroBannerFeatures from './HeroBannerFeatures';

interface HeroBannerContentProps {
  mounted: boolean;
}

const HeroBannerContent = ({ mounted }: HeroBannerContentProps) => {
  return (
    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
      <Fade in={mounted} timeout={1000}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <FlashOn sx={{ fontSize: 32, color: '#ffd700', animation: 'flash 2s ease-in-out infinite', '@keyframes flash': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.5 } } }} />
            <Typography
              variant="overline"
              sx={{
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: 2,
                color: 'rgba(255,255,255,0.9)',
                textTransform: 'uppercase',
              }}
            >
              Premium Shopping Experience
            </Typography>
          </Box>

          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem', lg: '6.5rem' },
              lineHeight: 1.1,
              mb: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 50%, #ffffff 100%)',
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'textShine 3s ease-in-out infinite',
              '@keyframes textShine': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' },
              },
              textShadow: '0 0 40px rgba(255,255,255,0.3)',
              letterSpacing: '-0.02em',
            }}
          >
            Welcome to
            <Box
              component="span"
              sx={{
                display: 'block',
                background: 'linear-gradient(135deg, #ffd700 0%, #ff6b6b 50%, #4ecdc4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                  borderRadius: '2px',
                }
              }}
            >
              Premium Store
            </Box>
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 300,
              fontSize: { xs: '1.3rem', md: '1.8rem' },
              mb: 5,
              color: 'rgba(255,255,255,0.95)',
              lineHeight: 1.6,
              maxWidth: '650px',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            Discover amazing products at unbeatable prices!
            <Box component="span" sx={{ display: 'block', mt: 1, fontWeight: 400 }}>
              Shop with confidence and enjoy premium quality with exceptional service.
            </Box>
          </Typography>

          <HeroBannerButtons mounted={mounted} />
          <HeroBannerFeatures mounted={mounted} />
        </Box>
      </Fade>
    </Box>
  );
};

export default HeroBannerContent;



