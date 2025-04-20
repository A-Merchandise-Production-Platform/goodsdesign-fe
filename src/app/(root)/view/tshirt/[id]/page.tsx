'use client';

import { useParams } from 'next/navigation';

import { Skeleton } from '@/components/ui/skeleton';
import {
  useProductDesignByIdQuery,
} from '@/graphql/generated/graphql';

import ProductDesigner from './_components/product-design';

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const { data: proDesData, loading: proDesLoading } =
    useProductDesignByIdQuery({
      variables: {
        productDesignId: id,
      },
    });

  if (proDesLoading) {
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
    <div className="container mx-auto min-h-screen">
      <ProductDesigner
        initialDesigns={proDesData?.productDesign?.designPositions}
        productVariant={proDesData?.productDesign?.systemConfigVariant}
        designId={id}
      />
    </div>
  );
}
