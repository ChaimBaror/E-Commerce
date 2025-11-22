import React from 'react';
import { Box } from '@mui/material';

const HeroBannerBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        color: 'white',
        pt: { xs: 10, md: 12 },
        pb: { xs: 8, md: 10 },
        mt: '70px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: '600px', md: '700px' },
        display: 'flex',
        alignItems: 'center',
        '@keyframes gradientShift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          animation: 'pulse 8s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.8 },
          },
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'float 20s linear infinite',
          pointerEvents: 'none',
          '@keyframes float': {
            '0%': { transform: 'translate(0, 0) rotate(0deg)' },
            '100%': { transform: 'translate(-50px, -50px) rotate(360deg)' },
          },
        }
      }}
    >
      {children}
    </Box>
  );
};

export default HeroBannerBackground;


