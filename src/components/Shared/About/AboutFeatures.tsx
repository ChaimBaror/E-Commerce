import React from 'react';
import { Box, Container, Grid } from '@mui/material';
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
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <AboutFeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                mounted={mounted}
                                delay={600 + index * 100}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default AboutFeatures;

