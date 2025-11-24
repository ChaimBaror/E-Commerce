import React from 'react';
import { allProducts } from '../lib/data/data';
import StorePageWrapper from '../components/Store/StorePageWrapper';
import { ProductBasicInfo } from '../types';

interface OnlineStoreProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    perPage?: string;
  }>;
}

export default async function OnlineStore({ searchParams }: OnlineStoreProps) {
  const resolvedSearchParams = await searchParams;
  const categories = Array.from(new Set(allProducts.map(product => product.category)));

  // Filter products on server based on searchParams
  let filteredProducts: ProductBasicInfo[] = allProducts;

  if (resolvedSearchParams.category) {
    filteredProducts = allProducts.filter(
      product => product.category === resolvedSearchParams.category
    );
  }

  return (
    <StorePageWrapper
      allProducts={filteredProducts}
      categories={categories}
      initialCategory={resolvedSearchParams.category}
      initialPage={resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1}
      initialPerPage={resolvedSearchParams.perPage ? parseInt(resolvedSearchParams.perPage) : 12}
    />
  );
}