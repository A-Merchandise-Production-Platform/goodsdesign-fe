'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Skeleton } from '@/components/ui/skeleton';
import {
  useCreateCartItemMutation,
  useProductDesignByIdQuery,
  useUpdateDesignPositionMutation,
  useUpdateProductDesignMutation,
  useUpdateThumbnailProductDesignMutation,
} from '@/graphql/generated/graphql';
import { useUploadFileMutation } from '@/graphql/upload-client/upload-file-hook';

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
