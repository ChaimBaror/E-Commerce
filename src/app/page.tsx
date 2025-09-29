"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Pagination, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem, 
  InputLabel,
  Stack,
  Divider
} from '@mui/material';
import CartDrawer from '../components/Cart/CartDrawer';
import ProductList from '../components/Product/ProductList';
import Footer from '../components/Shared/Footer';
import Navbar from '../components/Header/Navbar';
import { Product } from '../types';
import CategoryFilter from '../components/Shared/CategoryFilter';
import { allProducts } from '../data/data';
import { useCart } from '../contexts/CartContext';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const OnlineStore = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const { addToCart, getTotalItems } = useCart();
  const router = useRouter();
  const t = useTranslations('HomePage.store');

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

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when category or products per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, productsPerPage]);

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
    addToCart(product);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    // Scroll to top of products section when page changes
    window.scrollTo({
      top: 300,
      behavior: 'smooth'
    });
  };

  const handleProductsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProductsPerPage(Number(event.target.value));
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
      <Navbar 
        onCartOpen={handleCartOpen} 
        cartItemCount={getTotalItems()}
      />
      
      {/* <HeroBanner /> */}
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          title={t('shopByCategory')}
          variant="buttons"
          showAllOption={true}
        />
        
        {/* Products Info and Controls */}
        <Box sx={{ mt: 4, mb: 3 }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between" 
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
          >
            <Typography variant="body1" color="text.secondary">
              {t('showing', { 
                start: startIndex + 1, 
                end: Math.min(endIndex, filteredProducts.length), 
                total: filteredProducts.length 
              })}
              {selectedCategory !== null && selectedCategory !== -1 && (
                <span> {t('inCategory', { category: categories[selectedCategory] })}</span>
              )}
            </Typography>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>{t('perPage')}</InputLabel>
              <Select
                value={productsPerPage}
                label={t('perPage')}
                onChange={handleProductsPerPageChange}
              >
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={48}>48</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />
        
        {/* Products List */}
        <Box>
          <ProductList 
            products={currentProducts}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
          />
        </Box>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
            <Stack spacing={2} alignItems="center">
              <Pagination 
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton 
                showLastButton
                siblingCount={1}
                boundaryCount={1}
              />
              <Typography variant="body2" color="text.secondary">
                {t('page', { current: currentPage, total: totalPages })}
              </Typography>
            </Stack>
          </Box>
        )}
      </Container>
      
      <Footer />
      
      <CartDrawer 
        open={cartOpen} 
        onClose={handleCartClose}
      />
    </Box>
  );
};

export default OnlineStore;