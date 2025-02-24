'use client';

import { ApiResponse } from '@/api/types';
import { UploadApi } from '@/api/upload';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
/* eslint-disable unicorn/no-null */
import { useCallback, useState } from 'react';
import type { Area } from 'react-easy-crop';

export function useImageUpload(onChange: (fileUrl: string) => void) {
  const [preview, setPreview] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const imageMutation = useMutation({
    mutationFn: UploadApi.uploadImage,
    onSuccess: data => {
      onChange(data.fileUrl);
      setPreview(data.fileUrl);
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      console.log(error.response?.data.message);
    },
  });

  const handleImageUpload = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const removeImage = useCallback(() => {
    setPreview(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    onChange('');
  }, [onChange]);

  const handleCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleCropConfirm = useCallback(async () => {
    if (preview && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(
        preview,
        croppedAreaPixels,
        rotation,
      );
      if (croppedImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          imageMutation.mutate(croppedImage);
        };
        reader.readAsDataURL(croppedImage);
        imageMutation.mutate(croppedImage);
      }
      setIsCropperOpen(false);
    }
  }, [preview, croppedAreaPixels, rotation, onChange]);

  const setDefaultImage = useCallback((imageUrl: string) => {
    setPreview(imageUrl);
  }, []);

  return {
    preview,
    handleImageUpload,
    removeImage,
    crop,
    setCrop,
    zoom,
    setZoom,
    rotation,
    setRotation,
    handleCropComplete,
    handleCropConfirm,
    isCropperOpen,
    setIsCropperOpen,
    setDefaultImage,
    isLoading: imageMutation.isPending,
    isError: imageMutation.isError,
  };
}

async function getCroppedImg(
  imageSource: string,
  pixelCrop: Area,
  rotation = 0,
): Promise<File | null> {
  const image = await createImage(imageSource);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    return null;
  }

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  context.translate(safeArea / 2, safeArea / 2);
  context.rotate((rotation * Math.PI) / 180);
  context.translate(-safeArea / 2, -safeArea / 2);

  context.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5,
  );

  const data = context.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  context.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y,
  );

  return new Promise(resolve => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' }));
      } else {
        resolve(null);
      }
    }, 'image/jpeg');
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.src = url;
  });
}
