"use client";

import React, { useState, useMemo } from 'react';
import { Box, Container } from '@mui/material';
import CartDrawer from '../components/Cart/CartDrawer';
import ProductList from '../components/Product/ProductList';
import Footer from '../components/Shared/Footer';
import HeroBanner from '../components/Shared/HeroBanner';
import Navbar from '../components/Header/Navbar';
import { Product } from '../types';
import CategoryFilter from '../components/Shared/CategoryFilter';
import { allProducts } from '../data/data';

const OnlineStore = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(allProducts.map(product => product.category)));
  }, []);

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === null || selectedCategory === -1) {
      return allProducts; // Show all products
    }
    const categoryName = categories[selectedCategory];
    return allProducts.filter(product => product.category === categoryName);
  }, [selectedCategory, categories]);

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleCategorySelect = (categoryIndex: number) => {
    setSelectedCategory(categoryIndex);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // If item already exists, you might want to increase quantity
        // For now, we'll just add it again
        return [...prevItems, product];
      }
      return [...prevItems, product];
    });
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
      <Navbar 
        onCartOpen={handleCartOpen} 
        cartItemCount={cartItems.length}
      />
      
      {/* <HeroBanner /> */}
      
      <Container   maxWidth="lg" sx={{ py: 4 }}>
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          title="Shop by Category"
          variant="buttons"
          showAllOption={true}
        />
        
        <Box sx={{ mt: 4 }}>
          <ProductList 
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        </Box>
      </Container>
      
      <Footer />
      
      <CartDrawer 
        open={cartOpen} 
        onClose={handleCartClose}
        cartItems={cartItems}
        onUpdateCart={setCartItems}
      />
    </Box>
  );
};

export default OnlineStore;