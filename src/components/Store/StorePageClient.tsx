"use client";

import React, { useState } from 'react';
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
import CartDrawer from '../Cart/CartDrawer';
import ProductList from '../Product/ProductList';
import CategoryFilter from '../Shared/CategoryFilter';
import { ProductBasicInfo, Product } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface StorePageClientProps {
    allProducts: ProductBasicInfo[];
    categories: string[];
    initialCategory?: string;
    initialPage?: number;
    initialPerPage?: number;
}

export default function StorePageClient({
    allProducts,
    categories,
    initialCategory,
    initialPage = 1,
    initialPerPage = 12
}: StorePageClientProps) {
    const [cartOpen, setCartOpen] = useState(false);
    const categoryIndex = initialCategory
        ? categories.findIndex(cat => cat === initialCategory)
        : -1;
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        categoryIndex >= 0 ? categoryIndex : null
    );
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [productsPerPage, setProductsPerPage] = useState(initialPerPage);
    const { addToCart } = useCartStore();
    const router = useRouter();
    const t = useTranslations('HomePage.store');

    // Products are already filtered on server based on searchParams
    // When user changes category/page/perPage, URL is updated and server re-renders with new data
    const filteredProducts = allProducts;

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    const handleCartClose = () => {
        setCartOpen(false);
    };

    const handleCategorySelect = (categoryIndex: number) => {
        setSelectedCategory(categoryIndex);
        const category = categoryIndex >= 0 ? categories[categoryIndex] : undefined;
        const params = new URLSearchParams();
        if (category) {
            params.set('category', category);
        }
        if (currentPage > 1) {
            params.set('page', '1');
        }
        if (productsPerPage !== 12) {
            params.set('perPage', productsPerPage.toString());
        }
        const queryString = params.toString();
        router.push(queryString ? `/?${queryString}` : '/');
    };

    const handleAddToCart = (product: ProductBasicInfo) => {
        // Convert ProductBasicInfo to Product for cart
        const productForCart: Product = {
            ...product,
            description: "",
            rating: product.rating || 0,
            reviews: product.reviews || 0
        };
        addToCart(productForCart);
    };

    const handleProductClick = (productId: string) => {
        router.push(`/product/${productId}`);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        const params = new URLSearchParams();
        if (selectedCategory !== null && selectedCategory >= 0) {
            params.set('category', categories[selectedCategory]);
        }
        if (value > 1) {
            params.set('page', value.toString());
        }
        if (productsPerPage !== 12) {
            params.set('perPage', productsPerPage.toString());
        }
        const queryString = params.toString();
        router.push(queryString ? `/?${queryString}` : '/');
        window.scrollTo({
            top: 300,
            behavior: 'smooth'
        });
    };

    const handleProductsPerPageChange = (event: { target: { value: unknown } }) => {
        const newPerPage = Number(event.target.value);
        setProductsPerPage(newPerPage);
        const params = new URLSearchParams();
        if (selectedCategory !== null && selectedCategory >= 0) {
            params.set('category', categories[selectedCategory]);
        }
        if (currentPage > 1) {
            params.set('page', '1');
        }
        if (newPerPage !== 12) {
            params.set('perPage', newPerPage.toString());
        }
        const queryString = params.toString();
        router.push(queryString ? `/?${queryString}` : '/');
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, mt: { xs: 2, md: 4 } }}>
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategorySelect}
                    title={t('shopByCategory')}
                    variant="buttons"
                    showAllOption={true}
                />

                <Box sx={{ mt: { xs: 3, md: 4 }, mb: 3 }}>
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

                <Box>
                    <ProductList
                        products={currentProducts}
                        onAddToCart={handleAddToCart}
                        onProductClick={handleProductClick}
                    />
                </Box>

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
        </>
    );
}

