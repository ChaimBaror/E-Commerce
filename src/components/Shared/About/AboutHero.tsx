import React from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useTranslations } from 'next-intl';

interface AboutHeroProps {
    mounted: boolean;
}

const AboutHero = ({ mounted }: AboutHeroProps) => {
    const t = useTranslations('about');

    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 25%, #db2777 50%, #ec4899 75%, #f472b6 100%)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 15s ease infinite',
                color: 'white',
                pt: { xs: 8, md: 12 },
                pb: { xs: 6, md: 10 },
                position: 'relative',
                overflow: 'hidden',
                minHeight: { xs: '400px', md: '500px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 40%)
          `,
                    pointerEvents: 'none',
                },
            }}
        >
            <Fade in={mounted} timeout={1000}>
                <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1, px: 3 }}>
                    <Favorite
                        sx={{
                            fontSize: { xs: 48, md: 64 },
                            color: 'rgba(255,255,255,0.9)',
                            mb: 2,
                            animation: 'pulse 2s ease-in-out infinite',
                            '@keyframes pulse': {
                                '0%, 100%': { transform: 'scale(1)' },
                                '50%': { transform: 'scale(1.1)' },
                            },
                        }}
                    />
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                            lineHeight: 1.2,
                            mb: 2,
                            background: 'linear-gradient(135deg, #ffffff 0%, #ffe4e6 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 40px rgba(255,255,255,0.3)',
                        }}
                    >
                        {t('title')}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 300,
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            color: 'rgba(255,255,255,0.95)',
                            maxWidth: '800px',
                            mx: 'auto',
                        }}
                    >
                        {t('subtitle')}
                    </Typography>
                </Box>
            </Fade>
        </Box>
    );
};

export default AboutHero;

