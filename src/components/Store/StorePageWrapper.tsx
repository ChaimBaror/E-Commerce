"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from '../Header/Navbar';
import Footer from '../Shared/Footer';
import HeroBanner from '../Shared/HeroBanner';
import CartDrawer from '../Cart/CartDrawer';
import { useCartStore } from '../../stores/cartStore';
import StorePageClient from './StorePageClient';
import { ProductBasicInfo } from '../../types';

interface StorePageWrapperProps {
    allProducts: ProductBasicInfo[];
    categories: string[];
    initialCategory?: string;
    initialPage?: number;
    initialPerPage?: number;
}

export default function StorePageWrapper({
    allProducts,
    categories,
    initialCategory,
    initialPage = 1,
    initialPerPage = 12
}: StorePageWrapperProps) {
    const [cartOpen, setCartOpen] = useState(false);
    const { getTotalItems } = useCartStore();

    const handleCartOpen = () => {
        setCartOpen(true);
    };

    const handleCartClose = () => {
        setCartOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
            <Navbar
                onCartOpen={handleCartOpen}
                cartItemCount={getTotalItems()}
            />

            <HeroBanner />

            <StorePageClient
                allProducts={allProducts}
                categories={categories}
                initialCategory={initialCategory}
                initialPage={initialPage}
                initialPerPage={initialPerPage}
            />

            <Footer />

            <CartDrawer
                open={cartOpen}
                onClose={handleCartClose}
            />
        </Box>
    );
}

