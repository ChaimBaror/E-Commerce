"use client";

import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../Header/Navbar';
import Footer from '../Shared/Footer';
import AboutHero from '../Shared/About/AboutHero';
import AboutContent from '../Shared/About/AboutContent';
import AboutFeatures from '../Shared/About/AboutFeatures';
import { useCartStore } from '../../stores/cartStore';

export default function AboutPageWrapper() {
    const { getTotalItems } = useCartStore();

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
            <Navbar onCartOpen={() => { }} cartItemCount={getTotalItems()} />
            <AboutHero mounted={true} />
            <AboutContent mounted={true} />
            <AboutFeatures mounted={true} />
            <Footer />
        </Box>
    );
}

