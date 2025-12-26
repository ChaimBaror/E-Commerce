import React from 'react';
import { Box, Container, Typography, Paper, Fade } from '@mui/material';
import { useTranslations } from 'next-intl';

interface AboutContentProps {
    mounted: boolean;
}

const AboutContent = ({ mounted }: AboutContentProps) => {
    const t = useTranslations('about');

    return (
        <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: '#fafafa' }}>
            <Container maxWidth="lg">
                <Fade in={mounted} timeout={1200} style={{ transitionDelay: '200ms' }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 4, md: 6 },
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                            border: '1px solid rgba(236, 72, 153, 0.1)',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                lineHeight: 1.9,
                                color: 'text.secondary',
                                textAlign: 'justify',
                                '&::first-letter': {
                                    fontSize: '3rem',
                                    fontWeight: 700,
                                    float: 'left',
                                    lineHeight: 1,
                                    marginRight: '0.5rem',
                                    color: 'primary.main',
                                },
                            }}
                        >
                            {t('description')}
                        </Typography>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
};

export default AboutContent;

