'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Roles,
  useCreateCartItemMutation,
  useGetUserCartItemsQuery,
  useProductDesignByIdQuery,
  useUpdateDesignPositionMutation,
  useUpdateProductDesignMutation,
  useUpdateThumbnailProductDesignMutation,
} from '@/graphql/generated/graphql';
import { useUploadFileMutation } from '@/graphql/upload-client/upload-file-hook';

import ProductDesigner from './_components/product-design';
import { useAuthStore } from '@/stores/auth.store';
import NotFound from '@/app/not-found';

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuthStore();

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
    item => item.design?.id === id,
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
        return null;
      }

      // Update the thumbnail
      await updateThumbnailProductDesign({
        variables: {
          updateProductDesignId: id,
          input: {
            thumbnailUrl: newThumbnailUrl,
            isFinalized: false,
            isPublic: false,
            isTemplate: user?.role === Roles.Admin ? true : false,
          },
          fileUrl: currentThumbnailUrl,
        },
      });

      // Update state
      setCurrentThumbnailUrl(newThumbnailUrl);
      return newThumbnailUrl;
    } catch (error) {
      console.error('Thumbnail operation failed:', error);
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
        return fileUrl;
      }
      return null;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const router = useRouter();

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

  // Redirect to view page if design is public
  if (proDesData.productDesign.isPublic) {
    router.push(`/view/tshirt/${id}`);
    return null;
  }

  // Check if user is the owner
  const isOwner = user?.id === proDesData.productDesign.user?.id;

  if (!isOwner) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto min-h-screen">
      <ProductDesigner
        initialDesigns={proDesData?.productDesign?.designPositions}
        productVariant={proDesData?.productDesign?.systemConfigVariant}
        onUpload={handleUploadFile}
        onThumbnail={handleThumbnail}
        onUpdateVariant={updateVariant}
        onUpdatePosition={async options => {
          try {
            await updateDesignPosition(options);
          } catch (error) {
            console.error('Error updating position:', error);
          }
        }}
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
