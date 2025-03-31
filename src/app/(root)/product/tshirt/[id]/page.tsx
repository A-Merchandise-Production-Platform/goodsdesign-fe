'use client';

import { useProductDesignByIdQuery } from '@/graphql/generated/graphql';
import ProductDesigner from './_components/product-design';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const { data: prodesData, loading } = useProductDesignByIdQuery({
    variables: {
      productDesignId: id,
    },
  });

  useEffect(() => {
    if (prodesData) {
      console.log('API data received:', prodesData);
      console.log(
        'Design positions:',
        prodesData.productDesign?.designPositions,
      );
    }
  }, [prodesData]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-4xl space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-[600px] w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProductDesigner
        initialDesigns={prodesData?.productDesign?.designPositions}
      />
    </div>
  );
}
