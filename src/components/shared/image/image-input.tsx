'use client';

import { Trash2Icon, Upload } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
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
  onChange: (fileUrl: string) => void;
  ratio?: '1:1' | '16:9' | 'round';
  showGrid?: boolean;
  defaultImage?: string;
  isTextDisplay?: boolean;
  disabled?: boolean;
}

export default function ImageInput({
  onChange,
  ratio = '1:1',
  showGrid = true,
  defaultImage,
  isTextDisplay = false,
  disabled = false,
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
    setDefaultImage,
    isLoading,
  } = useImageUpload(onChange);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleImageUpload,
    accept: { 'image/*': [] },
    multiple: false,
    disabled: disabled,
  });

  useEffect(() => {
    if (defaultImage) {
      setDefaultImage(defaultImage);
    }
  }, [defaultImage, setDefaultImage]);

  const aspectRatio = {
    '1:1': 1,
    '16:9': 16 / 9,
    round: 1,
  }[ratio];

  const isRound = ratio === 'round';

  return (
    <>
      <Card
        className={`mx-auto w-full p-0 ${isRound ? 'overflow-hidden rounded-full' : ''}`}
      >
        <CardContent className="p-2">
          <div
            {...getRootProps()}
            className={`relative ${isRound ? 'aspect-square' : ratio === '16:9' ? 'aspect-video' : 'aspect-square'} border-2 border-dashed transition-colors ${
              isDragActive && !disabled
                ? 'border-muted-foreground bg-primary/10'
                : 'border-muted hover:border-muted-foreground'
            } ${isRound ? 'rounded-full' : 'rounded-lg'} ${
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
          >
            <input {...getInputProps()} disabled={disabled} />
            {preview ? (
              <div
                className={`group relative h-full w-full ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <Image
                  src={preview || '/placeholder.svg'}
                  alt="Preview"
                  fill
                  className={`object-cover ${isRound ? 'rounded-full' : 'rounded-lg'}`}
                />
                {!disabled && (
                  <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button
                        type={'button'}
                        variant="outline"
                        size="icon"
                        onClick={event => {
                          event.stopPropagation();
                          removeImage();
                          onChange('');
                        }}
                        aria-label="Remove image"
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div
                      className="inline-block size-8 animate-spin rounded-full border-2 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : undefined}
              </div>
            ) : (
              <div
                className={`flex h-full flex-col items-center justify-center p-4 text-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <Upload
                  className={`mb-4 h-12 w-12 ${disabled ? 'text-gray-300' : 'text-gray-400'}`}
                />
                <p
                  className={`text-sm ${disabled ? 'text-gray-300' : 'text-gray-500'}`}
                >
                  {isTextDisplay
                    ? isDragActive && !disabled
                      ? 'Drop the image here'
                      : disabled
                        ? 'Image upload disabled'
                        : "Drag 'n' drop an image here, or click to select"
                    : undefined}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isCropperOpen && !disabled} onOpenChange={setIsCropperOpen}>
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
          <div className="flex items-center gap-4">
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
          <div className="flex items-center gap-4">
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
            <Button type={'button'} onClick={handleCropConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
