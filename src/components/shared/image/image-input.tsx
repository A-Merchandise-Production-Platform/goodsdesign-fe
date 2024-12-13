/* eslint-disable unicorn/no-nested-ternary */
'use client';

import { Edit2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';

import { useImageUpload } from '@/components/shared/image/hooks/use-image-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';

interface ImageInputProps {
  onChange: (file: File) => void;
  ratio?: '1:1' | '16:9' | 'round';
  showGrid?: boolean;
}

export default function ImageInput({
  onChange,
  ratio = '1:1',
  showGrid = true,
}: ImageInputProps) {
  const {
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
    handleEdit,
  } = useImageUpload(onChange);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleImageUpload,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const aspectRatio = {
    '1:1': 1,
    '16:9': 16 / 9,
    round: 1,
  }[ratio];

  const isRound = ratio === 'round';

  return (
    <>
      <Card
        className={`mx-auto w-full max-w-md ${isRound ? 'overflow-hidden rounded-full' : ''}`}
      >
        <CardContent className="p-2">
          <div
            {...getRootProps()}
            className={`relative ${isRound ? 'aspect-square' : ratio === '16:9' ? 'aspect-video' : 'aspect-square'} border-2 border-dashed transition-colors ${
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
                <div className="absolute right-2 top-2 z-10 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={event => {
                      event.stopPropagation();
                      handleEdit();
                    }}
                    aria-label="Edit image"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={event => {
                      event.stopPropagation();
                      removeImage();
                    }}
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
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

      <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>
          <div className="relative h-[300px] w-full">
            {preview && (
              <Cropper
                image={preview}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={setZoom}
                rotation={rotation}
                showGrid={showGrid}
              />
            )}
          </div>
          <div className="my-4 flex items-center gap-4">
            <span className="w-16 text-right">Zoom:</span>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={value => setZoom(value[0])}
            />
            <span>{zoom.toFixed(1)}x</span>
          </div>
          <div className="my-4 flex items-center gap-4">
            <span className="w-16 text-right">Rotate:</span>
            <Slider
              value={[rotation]}
              min={0}
              max={360}
              step={1}
              onValueChange={value => setRotation(value[0])}
            />
            <span>{rotation}°</span>
          </div>
          <DialogFooter>
            <Button onClick={handleCropConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
