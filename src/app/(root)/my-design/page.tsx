'use client';

import { useProductDesignsByUserQuery } from '@/graphql/generated/graphql';
import { DesignCard } from './_components/design-card';
import { Sidebar } from '@/components/shared/sidebar';

export default function MyDesignPage() {
  const { data, loading } = useProductDesignsByUserQuery();

  return (
    <div className="grid grid-cols-1 gap-4 px-4 pt-4 pb-2 md:grid-cols-[200px_1fr]">
      <div>
        <Sidebar />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.productDesignsByUser?.length ? (
          data.productDesignsByUser.map(design => (
            <DesignCard
              key={design.id}
              id={design.id}
              image={design.thumbnailUrl || undefined}
              name={design.systemConfigVariant?.product.name}
              price={
                design.designPositions?.[0]?.positionType?.basePrice ||
                undefined
              }
              category={design.systemConfigVariant?.product?.category?.name}
            />
          ))
        ) : (
          <div className="container mx-auto py-6">
            <p>No designs found</p>
          </div>
        )}
      </div>
    </div>
  );
}
