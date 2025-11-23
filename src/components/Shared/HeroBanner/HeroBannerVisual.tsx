import React from 'react';
import { Box, Zoom } from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';

interface HeroBannerVisualProps {
  mounted: boolean;
}

const HeroBannerVisual = ({ mounted }: HeroBannerVisualProps) => {
  return (
    <Zoom in={mounted} timeout={1500} style={{ transitionDelay: '800ms' }}>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: { xs: 250, md: 400 },
            height: { xs: 250, md: 400 },
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(30px)',
            border: '3px solid rgba(255,255,255,0.3)',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2), inset 0 0 60px rgba(255,255,255,0.1)',
            animation: 'floatCircle 6s ease-in-out infinite',
            '@keyframes floatCircle': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-20px) rotate(5deg)' },
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -20,
              left: -20,
              right: -20,
              bottom: -20,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
              zIndex: -1,
              animation: 'pulseRing 3s ease-in-out infinite',
              '@keyframes pulseRing': {
                '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
                '50%': { opacity: 0.8, transform: 'scale(1.1)' },
              },
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: -40,
              left: -40,
              right: -40,
              bottom: -40,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
              zIndex: -2,
              animation: 'rotate 20s linear infinite',
              '@keyframes rotate': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              animation: 'iconBounce 2s ease-in-out infinite',
              '@keyframes iconBounce': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' },
              },
            }}
          >
            <ShoppingBag
              sx={{
                fontSize: { xs: 100, md: 160 },
                color: 'rgba(255,255,255,0.95)',
                filter: 'drop-shadow(0 4px 20px rgba(255,255,255,0.3))',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Zoom>
  );
};

export default HeroBannerVisual;


