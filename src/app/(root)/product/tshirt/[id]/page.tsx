'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Skeleton } from '@/components/ui/skeleton';
import {
  useCreateCartItemMutation,
  useGetUserCartItemsQuery,
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
  const [uploadFile, { loading: uploadFileloading }] = useUploadFileMutation();
  const [updateDesignPosition] = useUpdateDesignPositionMutation();
  const [createCartItem, { loading: cartLoading }] =
    useCreateCartItemMutation();
  const [updateVariant] = useUpdateProductDesignMutation();
  const [updateThumbnailProductDesign] =
    useUpdateThumbnailProductDesignMutation();
  const { data: cartData, refetch: cartRefetch } = useGetUserCartItemsQuery();
  const isInCart = cartData?.userCartItems?.some(
    item => item.design?.id === id
  );

  // Keep track of current thumbnail URL to handle deletion
  const [currentThumbnailUrl, setCurrentThumbnailUrl] = useState<string>('');

  // Update currentThumbnailUrl when proDesData is available
  useEffect(() => {
    if (proDesData?.productDesign?.thumbnailUrl) {
      setCurrentThumbnailUrl(proDesData.productDesign.thumbnailUrl);
    }
  }, [proDesData]);
  console.log(proDesData);

  const handleThumbnail = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return null;

    try {
      // Upload the file
      const uploadResult = await uploadFile({
        variables: { file },
      });

      const newThumbnailUrl = uploadResult.data?.uploadFile?.url;
      if (!newThumbnailUrl) {
        toast.error('Upload completed but no URL was returned');
        return null;
      }
      // Update the thumbnail
      await updateThumbnailProductDesign({
        variables: {
          updateProductDesignId: id,
          input: { thumbnailUrl: newThumbnailUrl },
          fileUrl: currentThumbnailUrl,
        },
      });

      // Update state and show success message
      setCurrentThumbnailUrl(newThumbnailUrl);
      toast.success('Thumbnail updated successfully');
      return newThumbnailUrl;
    } catch (error) {
      console.error('Thumbnail operation failed:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to process thumbnail',
      );
      return null;
    }
  };

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
    <div className="container mx-auto min-h-screen">
      <ProductDesigner
        initialDesigns={proDesData?.productDesign?.designPositions}
        productVariant={proDesData?.productDesign?.systemConfigVariant}
        onUpload={handleUploadFile}
        onThumbnail={handleThumbnail}
        onUpdateVariant={updateVariant}
        onUpdatePosition={updateDesignPosition}
        onCreateCartItem={async options => {
          await createCartItem(options);
          cartRefetch();
        }}
        cartLoading={cartLoading}
        designId={id}
        uploadLoading={uploadFileloading}
        thumbnailUrl={proDesData?.productDesign?.thumbnailUrl}
        isInCart={isInCart}
      />
    </div>
  );
}
