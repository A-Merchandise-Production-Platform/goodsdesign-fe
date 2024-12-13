'use client';

import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import { useImageUpload } from '@/components/shared/image/hooks/use-image-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ImageInputProps {
  onChange: (file: File) => void;
  ratio?: '1:1' | '16:9' | 'round';
}

export default function ImageInput({
  onChange,
  ratio = '1:1',
}: ImageInputProps) {
  const { preview, handleImageUpload, removeImage } = useImageUpload(onChange);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleImageUpload,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const aspectRatio = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-video',
    round: 'aspect-square',
  }[ratio];

  const isRound = ratio === 'round';

  return (
    <Card
      className={`mx-auto w-full max-w-md ${isRound ? 'overflow-hidden rounded-full' : ''}`}
    >
      <CardContent className="p-2">
        <div
          {...getRootProps()}
          className={`relative ${aspectRatio} border-2 border-dashed transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/10'
              : 'border-gray-300 hover:border-primary'
          } ${isRound ? 'rounded-full' : 'rounded-lg'}`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <>
              <div className="relative h-full w-full">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className={`object-cover ${isRound ? 'rounded-full' : 'rounded-lg'}`}
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 z-10"
                onClick={event => {
                  event.stopPropagation();
                  removeImage();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-4 text-center">
              <Upload className="mb-4 h-12 w-12 text-gray-400" />
              <p className="text-sm text-gray-500">
                {isDragActive
                  ? 'Drop the image here'
                  : "Drag 'n' drop an image here, or click to select"}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
