'use client';

import { useEffect } from 'react';
import {
  useProductDesignByIdQuery,
  useUpdateCartItemMutation,
  useUpdateDesignPositionMutation,
} from '@/graphql/generated/graphql';
import { useUploadFileMutation } from '@/graphql/upload-client/upload-file-hook';
import ProductDesigner from './_components/product-design';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const { data: proDesData, loading: proDesLoading } =
    useProductDesignByIdQuery({
      variables: {
        productDesignId: id,
      },
    });
  const [uploadFile, { loading: uploadFileloading }] = useUploadFileMutation();
  const [updateDesignPosition] = useUpdateDesignPositionMutation();
  const [createCartItem, { data: cartData, loading: cartLoading }] =
    useCreateCartItemMutation({
      variables: {
        designId: id,
        quantity: 1,
      },
    });

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return null;

    try {
      const result = await uploadFile({
        variables: { file },
      });

      // Check if the upload was successful
      if (result.data?.uploadFile?.url) {
        const fileUrl = result.data.uploadFile.url;
        toast.success(`File uploaded successfully!`);
        console.log('Upload successful, URL:', fileUrl);
        return fileUrl;
      } else {
        toast.error('Upload completed but no URL was returned');
        return null;
      }
    } catch (error) {
      // Detailed error logging
      console.error('Upload error:', error);

      // User-friendly error message
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(`Upload failed: ${errorMessage}`);
      return null;
    }
  };

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
    <div className="min-h-screen">
      <ProductDesigner
        initialDesigns={proDesData?.productDesign?.designPositions}
        onUpload={handleUploadFile}
        onUpdatePosition={updateDesignPosition}
        onCreateCartItem={createCartItem}
        designId={id}
      />
    </div>
  );
}
