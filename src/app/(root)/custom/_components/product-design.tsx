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
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import * as THREE from 'three';
import { FabricImage } from 'fabric';

import OversizeTshirtModel from './tshirt-model';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const imageMap = {
  front: '/models/oversize_tshirt_variants/front.png',
  back: '/models/oversize_tshirt_variants/back.png',
  'left-sleeve': '/models/oversize_tshirt_variants/left.png',
  'right-sleeve': '/models/oversize_tshirt_variants/right.png',
};

function handleUploadClick() {
  const input = document.querySelector('#image-upload') as HTMLInputElement;
  input?.click();
}

export default function ProductDesigner() {
  const [view, setView] = useState('front');
  const [currentTexture, setCurrentTexture] = useState<string>(
    imageMap['front'],
  );
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const textureCache = useRef<Record<string, HTMLImageElement>>({});

  const getCanvasSize = (currentView: string) => {
    return currentView === 'front' || currentView === 'back' ? 1280 : 1600;
  };

  const CANVAS_SIZE = getCanvasSize(view);

  const getDesignZoneLimits = (view: string) => {
    switch (view) {
      case 'front':
        return {
          minX: 160,
          maxX: 410,
          minY: 900,
          maxY: 1180,
        };
      case 'back':
        return {
          minX: 610,
          maxX: 880,
          minY: 870,
          maxY: 1180,
        };
      case 'left-sleeve':
        return {
          minX: 820,
          maxX: 940,
          minY: 780,
          maxY: 900,
        };
      case 'right-sleeve':
        return {
          minX: 1300,
          maxX: 1420,
          minY: 780,
          maxY: 900,
        };
      default:
        return {
          minX: 500,
          maxX: 1350,
          minY: 2900,
          maxY: 3800,
        };
    }
  };

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    // Clean up previous canvas if it exists
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
    }

    // Create new Fabric.js canvas
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      selection: true,
      preserveObjectStacking: true,
      interactive: true,
    });

    // Set up event listeners
    fabricCanvasRef.current.on('object:modified', updateTextureOnModel);
    fabricCanvasRef.current.on('object:added', e => {
      const obj = e.target as fabric.Object;
      applyClipPathToObject(obj, view);

      // If object is fully outside, remove it
      if (isObjectFullyOutside(obj, view)) {
        fabricCanvasRef.current?.remove(obj);
      }
    });

    fabricCanvasRef.current.on('mouse:down', e => {
      if (!e.target) return;

      const obj = e.target as fabric.Object;

      // If object is fully outside, remove it
      if (isObjectFullyOutside(obj, view)) {
        fabricCanvasRef.current?.remove(obj);
        fabricCanvasRef.current?.renderAll();
      }
    });

    fabricCanvasRef.current.on('object:scaling', e => {
      const obj = e.target as fabric.Object;

      // If object is fully outside after scaling, remove it
      if (isObjectFullyOutside(obj, view)) {
        fabricCanvasRef.current?.remove(obj);
      }
    });
    fabricCanvasRef.current.on('object:removed', updateTextureOnModel);

    // Load background texture
    loadBackgroundTexture(currentTexture);

    // Add design zone indicator
    addDesignZoneIndicator(view);

    fabricCanvasRef.current.renderAll();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
      }
    };
  }, [view, currentTexture]); // Re-initialize when view or texture changes

  // Update canvas when view changes
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    // Update background texture
    loadBackgroundTexture(imageMap[view as keyof typeof imageMap]);

    // Update design zone indicator
    addDesignZoneIndicator(view);
  }, [view]);

  // Load background texture
  const loadBackgroundTexture = (texturePath: string) => {
    if (!fabricCanvasRef.current) return;

    // Check if texture is already cached
    if (textureCache.current[texturePath]) {
      setBackgroundImage(textureCache.current[texturePath]);
      return;
    }

    // Load texture
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous'; // Add this to avoid CORS issues
    img.onload = () => {
      textureCache.current[texturePath] = img;
      setBackgroundImage(img);
    };
    img.onerror = err => {
      console.error('Error loading texture:', err);
      // Fallback to a plain background if image fails to load
      fabricCanvasRef.current!.backgroundColor = '#f0f0f0';
      fabricCanvasRef.current!.renderAll();
      updateTextureOnModel();
    };
    img.src = texturePath;
  };

  const applyClipPathToObject = (obj: fabric.Object, view: string) => {
    if (!fabricCanvasRef.current) return;

    const limits = getDesignZoneLimits(view);

    // Create a clip path for the object
    const clipPath = new fabric.Rect({
      left: limits.minX,
      top: limits.minY,
      width: limits.maxX - limits.minX,
      height: limits.maxY - limits.minY,
      absolutePositioned: true, // Ensures it applies correctly
    });

    obj.set({
      clipPath,
    });

    fabricCanvasRef.current.renderAll();
  };

  const isObjectFullyOutside = (obj: fabric.Object, view: string) => {
    const limits = getDesignZoneLimits(view);
    const objBounds = obj.getBoundingRect();

    return (
      objBounds.left + objBounds.width < limits.minX ||
      objBounds.left > limits.maxX ||
      objBounds.top + objBounds.height < limits.minY ||
      objBounds.top > limits.maxY
    );
  };

  // Set background image on canvas
  const setBackgroundImage = (img: HTMLImageElement) => {
    if (!fabricCanvasRef.current) return;

    // Create a fabric image object
    const fabricImage = new fabric.Image(img);

    // Calculate scale to fit canvas
    const scaleX = fabricCanvasRef.current.width! / img.width;
    const scaleY = fabricCanvasRef.current.height! / img.height;

    // Set properties
    fabricImage.set({
      scaleX: scaleX,
      scaleY: scaleY,
      originX: 'left',
      originY: 'top',
      selectable: false,
      evented: false,
    });

    // Set as background image
    fabricCanvasRef.current.backgroundImage = fabricImage;
    fabricCanvasRef.current.renderAll();
    updateTextureOnModel();
  };

  // Add design zone indicator
  const addDesignZoneIndicator = (view: string) => {
    if (!fabricCanvasRef.current) return;

    // Remove existing design zone indicator
    const existingIndicator = fabricCanvasRef.current
      .getObjects()
      .find(obj => obj.get('data')?.type === 'designZone');
    if (existingIndicator) {
      fabricCanvasRef.current.remove(existingIndicator);
    }

    // Get design zone limits
    const limits = getDesignZoneLimits(view);

    // Create design zone indicator with a more visible style
    const designZone = new fabric.Rect({
      left: limits.minX,
      top: limits.minY,
      width: limits.maxX - limits.minX,
      height: limits.maxY - limits.minY,
      fill: 'rgba(0, 120, 255, 0.05)',
      stroke: 'rgba(0, 120, 255, 0.7)',
      strokeWidth: 1,
      strokeDashArray: [15, 10],
      selectable: false,
      evented: false,
      data: { type: 'designZone' },
    });

    fabricCanvasRef.current.add(designZone);

    fabricCanvasRef.current.renderAll();
  };

  // Update texture on 3D model
  const updateTextureOnModel = () => {
    if (!fabricCanvasRef.current) return;

    const newTexture = new THREE.CanvasTexture(
      fabricCanvasRef.current.lowerCanvasEl,
    );
    newTexture.flipY = false;
    newTexture.colorSpace = THREE.SRGBColorSpace;
    setTexture(newTexture);
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !e.target.files ||
      e.target.files.length === 0 ||
      !fabricCanvasRef.current
    )
      return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = event => {
      if (!event.target?.result) return;

      const imageElement = new Image();
      imageElement.crossOrigin = 'anonymous';
      imageElement.src = event.target.result.toString();

      imageElement.onload = () => {
        const fabricImage = new fabric.Image(imageElement);
        const limits = getDesignZoneLimits(view);
        const maxWidth = limits.maxX - limits.minX;
        const maxHeight = limits.maxY - limits.minY;

        // Scale image to fit the design zone while maintaining aspect ratio
        const scale = Math.min(
          maxWidth / (fabricImage.width ?? 1),
          maxHeight / (fabricImage.height ?? 1),
        );

        fabricImage.set({
          scaleX: scale,
          scaleY: scale,
          left: limits.minX + (maxWidth - (fabricImage.width ?? 0) * scale) / 2,
          top:
            limits.minY + (maxHeight - (fabricImage.height ?? 0) * scale) / 2,
        });

        // Apply Clipping Path
        applyClipPathToObject(fabricImage, view);

        // If object is fully outside, remove it
        if (isObjectFullyOutside(fabricImage, view)) {
          return;
        }

        fabricCanvasRef.current?.add(fabricImage);
        fabricCanvasRef.current?.setActiveObject(fabricImage);
        fabricCanvasRef.current?.renderAll();
      };
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Delete' && fabricCanvasRef.current) {
      const activeObjects = fabricCanvasRef.current.getActiveObjects();
      if (activeObjects.length > 0) {
        activeObjects.forEach(object => {
          fabricCanvasRef.current?.remove(object);
        });
        fabricCanvasRef.current.discardActiveObject();
        fabricCanvasRef.current.renderAll();
      }
    }
  };

  // Add text to canvas
  const addText = () => {
    if (!fabricCanvasRef.current) return;

    const limits = getDesignZoneLimits(view);
    const text = new fabric.IText('Edit this text', {
      left: limits.minX + (limits.maxX - limits.minX) / 2,
      top: limits.minY + (limits.maxY - limits.minY) / 2,
      fontFamily: 'Arial',
      fontSize: 40,
      fill: '#000000',
      originX: 'center',
      originY: 'center',
      selectable: true,
      evented: true,
    });

    // Apply Clipping Path
    applyClipPathToObject(text, view);

    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="z-20 flex h-14 items-center justify-between border-b px-6">
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
        <div className="z-20 w-64 border-r">
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
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={addText}
            >
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
              // Update texture
              setCurrentTexture(imageMap[newView as keyof typeof imageMap]);
              // Update view
              setView(newView);
            }}
            className="border-b"
          >
            <TabsList className="z-20 w-full justify-start rounded-none">
              <TabsTrigger value="front">Front</TabsTrigger>
              <TabsTrigger value="back">Back</TabsTrigger>
              <TabsTrigger value="left-sleeve">Left sleeve</TabsTrigger>
              <TabsTrigger value="right-sleeve">Right sleeve</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex h-[32rem] flex-1 gap-4 pt-4">
            {/* Canvas Area */}
            <div className="bg-muted relative z-10 flex h-[32rem] w-[32rem] flex-col items-center justify-center gap-4">
              <div
                className={`absolute -z-10 flex flex-col items-center gap-4 ${
                  view === 'front'
                    ? '-top-190 -left-10'
                    : view === 'back'
                      ? '-top-190 -left-121.5'
                      : view === 'left-sleeve'
                        ? '-top-150 -left-155'
                        : '-top-150 -left-275'
                } `}
              >
                <canvas
                  ref={canvasRef}
                  className="p-4"
                  style={{
                    width: `${CANVAS_SIZE}px`,
                    height: `${CANVAS_SIZE}px`,
                  }}
                />
              </div>
            </div>

            {/* 3D Model Area */}
            <div className="relative z-10 h-[32rem] flex-grow">
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
