import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Stack,
  alpha,
  Fade,
  Zoom
} from '@mui/material';
import { 
  ShoppingBag, 
  Star, 
  LocalShipping, 
  Security,
  TrendingUp,
  FlashOn
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const HeroBanner = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    { icon: <LocalShipping />, text: 'Free Shipping', color: '#10b981' },
    { icon: <Security />, text: 'Secure Payment', color: '#3b82f6' },
    { icon: <Star />, text: 'Premium Quality', color: '#f59e0b' },
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        color: 'white',
        py: { xs: 8, md: 12 },
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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={6}
          alignItems="center"
          sx={{ minHeight: { xs: '500px', md: '600px' } }}
        >
          {/* Content */}
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

            {/* Features */}
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
              </Box>
            </Fade>
          </Box>

          {/* Visual Element */}
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
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroBanner;