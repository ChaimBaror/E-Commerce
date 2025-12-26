import React from 'react';
import { Card, CardContent, Typography, Fade, Stack, Box } from '@mui/material';

interface AboutFeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    mounted: boolean;
    delay: number;
}

const AboutFeatureCard = ({
    icon,
    title,
    description,
    mounted,
    delay,
}: AboutFeatureCardProps) => {
    return (
        <Fade in={mounted} timeout={1200} style={{ transitionDelay: `${delay}ms` }}>
            <Card
                elevation={2}
                sx={{
                    height: '100%',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(236, 72, 153, 0.1)',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(236, 72, 153, 0.2)',
                        borderColor: 'primary.main',
                    },
                }}
            >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Stack spacing={2} alignItems="center">
                        <Box sx={{ color: 'primary.main', mb: 1 }}>{icon}</Box>
                        <Typography variant="h6" fontWeight="bold">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Fade>
    );
};

export default AboutFeatureCard;

