'use client';

import { useGetAllProductsQuery } from '@/graphql/generated/graphql';
import { DesignSection } from './_components/design-section';
import { ProductSection } from './_components/product-section';
import { PromotionalBanner } from './_components/promotional-banner';
import { Sidebar } from '@/components/shared/sidebar';

export default function Home() {
  const { data: proData, loading: proLoading } = useGetAllProductsQuery();
  const sortedProducts = proData?.products
    ?.slice()
    .sort((a, b) => (a.id ?? '').localeCompare(b.id ?? ''));

  return (
    <div className="grid grid-cols-1 gap-4 px-4 pt-4 pb-2 md:grid-cols-[200px_1fr]">
      <div>
        <Sidebar />
      </div>
      <div className="px-4 py-8">
        <PromotionalBanner />

        <h1 className="mb-2 text-3xl font-bold">Customize Your Product</h1>
        <p className="text-muted-foreground mb-8">
          Select a product to customize with our available designs
        </p>

        <ProductSection products={sortedProducts} />

        <DesignSection />
      </div>
    </div>
  );
}
