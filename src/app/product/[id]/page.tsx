import React from 'react';
import { detailedProducts, getDetailedProduct } from '@/lib/data/data';
import ProductPageClient from '@/components/Product/ProductPageClient';
import ProductNotFound from '@/components/Product/ProductNotFound';
import { Product } from '@/types';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getDetailedProduct(resolvedParams.id);

  if (!product) {
    return <ProductNotFound />;
  }


  return <ProductPageClient product={product} />;
}
