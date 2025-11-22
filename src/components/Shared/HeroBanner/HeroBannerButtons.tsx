import React from 'react';
import { Stack, Button, Zoom } from '@mui/material';
import { ShoppingBag, TrendingUp } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface HeroBannerButtonsProps {
  mounted: boolean;
}

const HeroBannerButtons = ({ mounted }: HeroBannerButtonsProps) => {
  const router = useRouter();

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={3}
      sx={{ mb: 5 }}
    >
      <Zoom in={mounted} timeout={1200} style={{ transitionDelay: '200ms' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingBag />}
          onClick={() => router.push('/')}
          sx={{
            py: 2,
            px: 5,
            fontSize: '1.2rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.4)',
            backdropFilter: 'blur(20px)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)',
            textTransform: 'none',
            letterSpacing: '0.5px',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transition: 'left 0.5s',
            },
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.25) 100%)',
              borderColor: 'rgba(255,255,255,0.6)',
              transform: 'translateY(-3px) scale(1.02)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)',
              '&::before': {
                left: '100%',
              },
            },
            '&:active': {
              transform: 'translateY(-1px) scale(0.98)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Shop Now
        </Button>
      </Zoom>
      
      <Zoom in={mounted} timeout={1200} style={{ transitionDelay: '400ms' }}>
        <Button
          variant="outlined"
          size="large"
          startIcon={<TrendingUp />}
          onClick={() => router.push('/about')}
          sx={{
            py: 2,
            px: 5,
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'white',
            borderColor: 'rgba(255,255,255,0.5)',
            borderWidth: 2,
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            background: 'rgba(255,255,255,0.05)',
            textTransform: 'none',
            letterSpacing: '0.5px',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255,255,255,0.15)',
              transform: 'translateY(-3px) scale(1.02)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Learn More
        </Button>
      </Zoom>
    </Stack>
  );
};

export default HeroBannerButtons;


