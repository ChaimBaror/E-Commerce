import React, { useEffect, useState } from 'react';
import { Container, Stack, Fade } from '@mui/material';
import HeroBannerBackground from './HeroBanner/HeroBannerBackground';
import HeroBannerContent from './HeroBanner/HeroBannerContent';
import HeroBannerVisual from './HeroBanner/HeroBannerVisual';

const HeroBanner = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade 
      in={visible} 
      timeout={1000} 
      unmountOnExit
      appear={false}
    >
      <div>
        <HeroBannerBackground>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={6}
              alignItems="center"
              sx={{ minHeight: { xs: '500px', md: '600px' } }}
            >
              <HeroBannerContent mounted={mounted} />
              <HeroBannerVisual mounted={mounted} />
            </Stack>
          </Container>
        </HeroBannerBackground>
      </div>
    </Fade>
  );
};

export default HeroBanner;
