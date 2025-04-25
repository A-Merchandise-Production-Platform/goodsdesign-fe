'use client';

import { useParams } from 'next/navigation';

import { Skeleton } from '@/components/ui/skeleton';
import { Roles, useProductDesignByIdQuery } from '@/graphql/generated/graphql';

import ProductDesigner from './_components/product-design';
import { useAuthStore } from '@/stores/auth.store';
import NotFound from '@/app/not-found';

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const { isAuth, user } = useAuthStore();

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

  if (!proDesData?.productDesign) {
    return <NotFound />;
  }

  const isPublic = proDesData.productDesign.isPublic;
  const isOwner = user?.id === proDesData.productDesign.user?.id;
  const isNotCustomer = isAuth && user?.role !== Roles.Customer;

  if (!isPublic && !isOwner && !isNotCustomer) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto min-h-screen">
      <ProductDesigner
        designId={id}
        initialDesigns={proDesData?.productDesign?.designPositions}
        productVariant={proDesData?.productDesign?.systemConfigVariant}
      />
    </div>
  );
}
