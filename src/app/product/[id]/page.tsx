import React from 'react';
import { detailedProducts, getDetailedProduct } from '@/src/lib/data/data';
import ProductPageClient from '@/src/components/Product/ProductPageClient';
import ProductNotFound from '@/src/components/Product/ProductNotFound';
import { Product } from '@/src/types';

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
