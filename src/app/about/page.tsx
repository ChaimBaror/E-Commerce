"use client";

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/Shared/Footer';
import { useCartStore } from '../../stores/cartStore';
import AboutHero from '../../components/Shared/About/AboutHero';
import AboutContent from '../../components/Shared/About/AboutContent';
import AboutFeatures from '../../components/Shared/About/AboutFeatures';

const AboutPage = () => {
    const { getTotalItems } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
            <Navbar onCartOpen={() => { }} cartItemCount={getTotalItems()} />
            <AboutHero mounted={mounted} />
            <AboutContent mounted={mounted} />
            <AboutFeatures mounted={mounted} />
            <Footer />
        </Box>
    );
};

export default AboutPage;

