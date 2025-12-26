import React from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { useTranslations } from 'next-intl';

interface AboutFeaturesHeaderProps {
    mounted: boolean;
}

const AboutFeaturesHeader = ({ mounted }: AboutFeaturesHeaderProps) => {
    const t = useTranslations('about');

    return (
        <Fade in={mounted} timeout={1200} style={{ transitionDelay: '400ms' }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography
                    variant="h3"
                    component="h2"
                    fontWeight="bold"
                    sx={{
                        mb: 2,
                        background: 'linear-gradient(135deg, #1e293b 0%, #ec4899 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {t('featuresTitle')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {t('featuresSubtitle')}
                </Typography>
            </Box>
        </Fade>
    );
};

export default AboutFeaturesHeader;

