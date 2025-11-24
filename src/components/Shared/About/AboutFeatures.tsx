import React from 'react';
import { Box, Container } from '@mui/material';
import {
    Favorite,
    LocalFlorist,
    AutoAwesome,
    CheckCircle,
} from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import AboutFeatureCard from './AboutFeatureCard';
import AboutFeaturesHeader from './AboutFeaturesHeader';

interface AboutFeaturesProps {
    mounted: boolean;
}

const AboutFeatures = ({ mounted }: AboutFeaturesProps) => {
    const t = useTranslations('about');

    const features = [
        {
            icon: <LocalFlorist sx={{ fontSize: 40 }} />,
            title: t('feature1.title'),
            description: t('feature1.description'),
        },
        {
            icon: <AutoAwesome sx={{ fontSize: 40 }} />,
            title: t('feature2.title'),
            description: t('feature2.description'),
        },
        {
            icon: <CheckCircle sx={{ fontSize: 40 }} />,
            title: t('feature3.title'),
            description: t('feature3.description'),
        },
        {
            icon: <Favorite sx={{ fontSize: 40 }} />,
            title: t('feature4.title'),
            description: t('feature4.description'),
        },
    ];

    return (
        <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <AboutFeaturesHeader mounted={mounted} />
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)'
                        },
                        gap: 4
                    }}
                >
                    {features.map((feature, index) => (
                        <Box key={index}>
                            <AboutFeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                mounted={mounted}
                                delay={600 + index * 100}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default AboutFeatures;

