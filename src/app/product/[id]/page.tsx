import React, { Suspense } from 'react';
import { getDetailedProduct } from '@/lib/data/data';
import ProductPageClient from '@/components/Product/ProductPageClient';
import ProductNotFound from '@/components/Product/ProductNotFound';
import ProductPageSkeleton from '@/components/Shared/Skeletons/ProductPageSkeleton';
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

  return (
    <Suspense fallback={<ProductPageSkeleton />}> 
      <ProductPageClient product={product} />
    </Suspense>
  );
}