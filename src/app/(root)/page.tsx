'use client';

import { PromotionalBanner } from './_components/promotional-banner';
import { ProductSection } from './_components/product-section';
import { DesignSection } from './_components/design-section';
import { useGetAllProductsQuery } from '@/graphql/generated/graphql';

export default function Home() {
  const { data: proData, loading: proLoading } = useGetAllProductsQuery();

  return (
    <div className="container mx-auto px-4 py-8">
      <PromotionalBanner />

      <h1 className="mb-2 text-3xl font-bold">Customize Your Product</h1>
      <p className="text-muted-foreground mb-8">
        Select a product to customize with our available designs
      </p>

      <ProductSection products={proData?.products} />

      <DesignSection />
    </div>
  );
}
