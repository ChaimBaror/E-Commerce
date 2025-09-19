"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';
import CartDrawer from '../components/Cart/CartDrawer';
import ProductList from '../components/Product/ProductList';
import Footer from '../components/Shared/Footer';
import HeroBanner from '../components/Shared/HeroBanner';
import Navbar from '../components/Header/Navbar';
import { Product } from '../types';
import CategoryFilter from '../components/Shared/CategoryFilter';

const OnlineStore = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Product 1',
      price: 100,
      description: 'Description for Product 1',
      image: '/images/product1.jpg',
      category: 'Category 1',
      rating: 4.5,
      reviews: 1,
    },
    {
      id: '2',
      name: 'Product 2',
      price: 200,
      description: 'Description for Product 2',
      image: '/images/product2.jpg',
      category: 'Category 2',
      rating: 4.0,
      reviews: 1,
    },
  ]);

  const onCartOpen = () => {
    setCartOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }} dir="rtl">
      <Navbar onCartOpen={onCartOpen} />
      <HeroBanner />
      {/* <CategoryFilter 
        categories={['Category 1', 'Category 2']} 
        selectedCategory="Category 1" 
        onSelectCategory={(category) => {
          setFilteredProducts(filteredProducts.filter(product => product.category === category));
        }} 
      /> */}
      <ProductList products={filteredProducts} />
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </Box>
  );
};

export default OnlineStore;