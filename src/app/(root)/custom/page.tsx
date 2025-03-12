'use client';
import {
  BookMarked,
  Redo2,
  Shapes,
  ShirtIcon as TShirt,
  Smile,
  Type,
  Undo2,
  Upload,
  Wand2,
} from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

import OversizeTshirtModel from './_components/oversize-tshirt-model';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import DesignCanvas from './_components/design-canvas';

const imageMap = {
  front: '/models/oversize_tshirt_variants/front.png',
  back: '/models/oversize_tshirt_variants/back.png',
  'left-sleeve': '/models/oversize_tshirt_variants/left.png',
  'right-sleeve': '/models/oversize_tshirt_variants/right.png',
};

function TShirtTemplate({ view }: { view: string }) {
  const printArea = {
    front: { x: 128, y: 128, width: 256, height: 320 },
    back: { x: 128, y: 64, width: 256, height: 384 },
    'left-sleeve': { x: 192, y: 176, width: 128, height: 128 },
    'right-sleeve': { x: 192, y: 176, width: 128, height: 128 },
  };

  const area = printArea[view as keyof typeof printArea];

  const imageMap = {
    front: '/models/oversize_tshirt_variants/front.png',
    back: '/models/oversize_tshirt_variants/back.png',
    'left-sleeve': '/models/oversize_tshirt_variants/left.png',
    'right-sleeve': '/models/oversize_tshirt_variants/right.png',
  };

  return (
    <div className="absolute h-full w-full">
      <div className="relative h-full w-full">
        <Image
          src={imageMap[view as keyof typeof imageMap]}
          alt={`T-shirt ${view} view`}
          fill
          className="object-contain"
          priority
        />
      </div>
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        {/* Print Area */}
        <rect
          x={area.x}
          y={area.y}
          width={area.width}
          height={area.height}
          fill="none"
          stroke="#666"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Safe Print Area Text */}
        <text
          x={area.x + area.width / 2}
          y={area.y + area.height / 2}
          textAnchor="middle"
          fill="#666"
          fontSize="12"
        >
          Safe Print Area
        </text>
      </svg>
    </div>
  );
}

function handleUploadClick() {
  const input = document.querySelector('#image-upload') as HTMLInputElement;
  input?.click();
}

export default function ProductDesigner() {
  const [view, setView] = React.useState('front');
  const [currentTexture, setCurrentTexture] = React.useState<string>(
    imageMap['front'],
  );
  const [uploadedImage, setUploadedImage] =
    React.useState<HTMLImageElement | null>(null);
  const defaultPositions = {
    front: { x: 750, y: 3150 },
    back: { x: 2200, y: 3150 },
    'left-sleeve': { x: 2110, y: 2000 },
    'right-sleeve': { x: 3330, y: 2000 },
  };

  const [imagePosition, setImagePosition] = React.useState<{
    x: number;
    y: number;
  }>(defaultPositions.front);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [texture, setTexture] = React.useState<THREE.CanvasTexture | null>(
    null,
  );
  const isDragging = useRef(false);

  const CANVAS_SIZE = 4096;

  // Cache for texture images
  const textureCache = useRef<Record<string, HTMLImageElement>>({});
  const [isCanvasVisible, setIsCanvasVisible] = React.useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background texture
      if (textureCache.current[currentTexture]) {
        ctx.drawImage(
          textureCache.current[currentTexture],
          0,
          0,
          canvas.width,
          canvas.height,
        );
      }

      // Draw uploaded image if any
      if (uploadedImage) {
        ctx.drawImage(
          uploadedImage,
          imagePosition.x,
          imagePosition.y,
          300,
          300,
        );
      }

      // Only update texture on model when not dragging
      if (!isDragging.current) {
        updateTextureOnModel();
      }
    };

    // Load texture if not cached
    if (!textureCache.current[currentTexture]) {
      const img = document.createElement('img');
      img.onload = () => {
        textureCache.current[currentTexture] = img;
        updateCanvas();
      };
      img.src = currentTexture;
    } else {
      updateCanvas();
    }
  }, [currentTexture, uploadedImage, imagePosition]);

  // Show canvas after view change
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCanvasVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [view]);

  const updateTextureOnModel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const newTexture = new THREE.CanvasTexture(canvas);
    newTexture.flipY = false;
    newTexture.colorSpace = THREE.SRGBColorSpace;
    setTexture(newTexture);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setUploadedImage(img);
    };
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current || !uploadedImage) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * CANVAS_SIZE - 250;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_SIZE - 250;

    // Adjust x position based on view
    if (view === 'left-sleeve') {
      x = Math.max(2000, Math.min(x, 3000)); // Keep on left side
    } else if (view === 'right-sleeve') {
      x = Math.max(0, Math.min(x, 1000)); // Keep on right side
    } else {
      x = Math.max(1000, Math.min(x, 2000)); // Keep in center for front/back
    }

    setImagePosition({ x, y });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    updateTextureOnModel();
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">White T-Shirt</h1>
          <Button variant="link" className="text-blue-500">
            Change product
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Redo2 className="h-4 w-4" />
          </Button>
          <Tabs defaultValue="design">
            <TabsList>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="mockups">Mockups</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Fixed Sidebar */}
        <div className="w-64 border-r">
          <div className="flex flex-col gap-4 p-4">
            <Button variant="ghost" className="justify-start gap-2">
              <TShirt className="h-4 w-4" />
              Product
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                className="justify-start gap-2"
                onClick={handleUploadClick}
              >
                <Upload className="h-4 w-4" />
                Uploads
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <Button variant="ghost" className="justify-start gap-2">
              <Type className="h-4 w-4" />
              Text
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <BookMarked className="h-4 w-4" />
              Saved designs
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Smile className="h-4 w-4" />
              Clipart
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Wand2 className="h-4 w-4" />
              Quick Designs
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Shapes className="h-4 w-4" />
              Shapes
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* View Selector Tabs */}
          <Tabs
            value={view}
            onValueChange={newView => {
              // Hide canvas immediately
              setIsCanvasVisible(false);
              // Update all states immediately
              setCurrentTexture(imageMap[newView as keyof typeof imageMap]);
              setImagePosition(
                defaultPositions[newView as keyof typeof defaultPositions],
              );
              setView(newView);
            }}
            className="border-b"
          >
            <TabsList className="w-full justify-start rounded-none z-20">
              <TabsTrigger value="front">Front</TabsTrigger>
              <TabsTrigger value="back">Back</TabsTrigger>
              <TabsTrigger value="left-sleeve">Left sleeve</TabsTrigger>
              <TabsTrigger value="right-sleeve">Right sleeve</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex h-[32rem] flex-1 gap-4 p-4">
            {/* Khu vực chứa Texture Image Preview & Upload */}
            <div className="bg-muted relative z-10 flex h-[32rem] w-[32rem] flex-col items-center justify-center gap-4">
              <div
                className={`absolute -z-10 flex flex-col items-center gap-4 ${
                  view === 'front'
                    ? '-top-190 -left-10'
                    : view === 'back'
                      ? '-top-190 -left-121.5'
                      : view === 'left-sleeve'
                        ? '-top-105 -left-110'
                        : '-top-105 -left-205'
                }`}
              >
                <canvas
                  ref={canvasRef}
                  width={CANVAS_SIZE}
                  height={CANVAS_SIZE}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className="p-4"
                  style={{
                    width: '1280px',
                    height: '1280px',
                    visibility: isCanvasVisible ? 'visible' : 'hidden',
                  }}
                />
              </div>
            </div>

            {/* Khu vực chứa Model 3D */}
            <div className="relative flex-grow rounded-lg">
              <OversizeTshirtModel texture={texture} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-gray-100">
            <TShirt className="h-full w-full p-4" />
          </div>
          <div>
            <h3 className="font-semibold">White T-Shirt</h3>
            <p className="text-sm text-gray-500">$25.00</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">1 out of 5 products</span>
          <Button>Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
