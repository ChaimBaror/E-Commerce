"use client";

import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Navbar from '../Header/Navbar';
import Footer from '../Shared/Footer';
import { useCartStore } from '../../stores/cartStore';

export default function ProductNotFound() {
    const router = useRouter();
    const t = useTranslations('HomePage.productPage');
    const { getTotalItems } = useCartStore();

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
            <Navbar onCartOpen={() => { }} cartItemCount={getTotalItems()} />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" align="center" color="error">
                    {t('productNotFound')}
                </Typography>
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Button
                        variant="contained"
                        onClick={() => router.push('/')}
                        startIcon={<ArrowBackIcon />}
                    >
                        {t('backToStore')}
                    </Button>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}

