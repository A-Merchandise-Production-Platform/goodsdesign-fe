'use client';
import {
  BookMarked,
  ChevronDown,
  Redo2,
  Save,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import * as fabric from 'fabric';
import * as THREE from 'three';
import { FabricImage, Image as FImage } from 'fabric';

interface DesignObject {
  type: string;
  left: number;
  top: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  src?: string;
  text?: string;
  fontSize?: number;
  fill?: string | null;
  fontFamily?: string;
}

type SerializedDesign = Record<string, DesignObject[]>;

import OversizeTshirtModel from './tshirt-model';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const imageMap = {
  front: '/models/oversize_tshirt_variants/original.png',
  back: '/models/oversize_tshirt_variants/original.png',
  'left-sleeve': '/models/oversize_tshirt_variants/original.png',
  'right-sleeve': '/models/oversize_tshirt_variants/original.png',
};

function handleUploadClick() {
  const input = document.querySelector('#image-upload') as HTMLInputElement;
  input?.click();
}

type ShirtColor = (typeof SHIRT_COLORS)[number]['value'];

const SHIRT_COLORS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' },
  { name: 'Navy', value: '#000080' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Green', value: '#008000' },
] as const;

export default function ProductDesigner() {
  const [view, setView] = useState('front');
  const [currentTexture, setCurrentTexture] = useState<string>(
    imageMap['front'],
  );
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const [designs, setDesigns] = useState<Record<string, DesignObject[]>>({});
  const [shirtColor, setShirtColor] = useState<ShirtColor>(
    SHIRT_COLORS[0].value,
  );

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

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);

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

        // Add image to canvas
        fabricCanvasRef.current?.add(fabricImage);
        fabricCanvasRef.current?.setActiveObject(fabricImage);
        fabricCanvasRef.current?.renderAll();

        // **Immediately Update Texture on 3D Model**
        updateTextureOnModel();
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
        updateTextureOnModel();
      }
    }
  };

  // Save current canvas state
  const saveCurrentDesign = () => {
    if (!fabricCanvasRef.current) return;

    const objects = fabricCanvasRef.current.getObjects().filter(obj => {
      // Filter out design zone indicator
      return obj.get('data')?.type !== 'designZone';
    });

    const serializedObjects = objects.map(obj => {
      const base: DesignObject = {
        type: obj.type || '',
        left: obj.left || 0,
        top: obj.top || 0,
        width: obj.width || 0,
        height: obj.height || 0,
        scaleX: obj.scaleX || 1,
        scaleY: obj.scaleY || 1,
        angle: obj.angle || 0,
      };

      if (obj instanceof fabric.Image) {
        base.src = (obj as FabricImage).getSrc();
      } else if (obj instanceof fabric.IText) {
        base.type = 'textbox';
        base.text = obj.text || '';
        base.fontSize = obj.fontSize || 40;
        base.fill = typeof obj.fill === 'string' ? obj.fill : '#000000';
        base.fontFamily = obj.fontFamily || 'Arial';
      }

      return base;
    });

    // Save to state with explicit typing
    setDesigns(prev => {
      const newDesigns: SerializedDesign = {
        ...prev,
        [view]: serializedObjects,
      };
      return newDesigns;
    });
  };

  // Load saved design for current view
  const loadSavedDesign = () => {
    if (!fabricCanvasRef.current) return;

    const savedDesign = designs[view];
    if (!savedDesign) return;

    // Clear current objects except design zone
    const objects = fabricCanvasRef.current.getObjects();
    objects.forEach(obj => {
      if (obj.get('data')?.type !== 'designZone') {
        fabricCanvasRef.current?.remove(obj);
      }
    });

    // Load saved objects
    savedDesign.forEach((objData: DesignObject) => {
      if (objData.type === 'textbox' && objData.text) {
        const text = new fabric.IText(objData.text, {
          left: objData.left,
          top: objData.top,
          fontSize: objData.fontSize,
          fill: objData.fill,
          fontFamily: objData.fontFamily,
          scaleX: objData.scaleX,
          scaleY: objData.scaleY,
          angle: objData.angle,
        });
        applyClipPathToObject(text, view);
        fabricCanvasRef.current?.add(text);
      } else if (objData.type === 'image' && objData.src) {
        const imgElement = new Image();
        imgElement.crossOrigin = 'anonymous';
        imgElement.onload = () => {
          const fabricImage = new fabric.Image(imgElement);
          fabricImage.set({
            left: objData.left,
            top: objData.top,
            scaleX: objData.scaleX,
            scaleY: objData.scaleY,
            angle: objData.angle,
          });
          applyClipPathToObject(fabricImage, view);
          fabricCanvasRef.current?.add(fabricImage);
          fabricCanvasRef.current?.renderAll();
        };
        imgElement.src = objData.src;
      }
    });

    fabricCanvasRef.current.renderAll();
    updateTextureOnModel();
  };

  // Load saved design when view changes
  useEffect(() => {
    loadSavedDesign();
  }, [view]);

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
    updateTextureOnModel(); // Update 3D model
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="z-50 flex h-14 items-center justify-between border-b px-6">
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
          <Button
            variant="ghost"
            size="icon"
            onClick={saveCurrentDesign}
            title="Save current design"
          >
            <Save className="h-4 w-4" />
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
        <div className="z-50 w-64 border-r">
          <div className="flex flex-col gap-4 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <TShirt className="h-4 w-4" style={{ color: shirtColor }} />
                  <span>Product Color</span>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {SHIRT_COLORS.map(color => (
                  <DropdownMenuItem
                    key={color.value}
                    onClick={() => setShirtColor(color.value)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded border"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.name}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
              // Save current design before switching view
              saveCurrentDesign();
              // Update texture
              setCurrentTexture(imageMap[newView as keyof typeof imageMap]);
              // Update view
              setView(newView);
            }}
            className="border-b"
          >
            <TabsList className="z-50 w-full justify-start rounded-none">
              <TabsTrigger value="front">Front</TabsTrigger>
              <TabsTrigger value="back">Back</TabsTrigger>
              <TabsTrigger value="left-sleeve">Left sleeve</TabsTrigger>
              <TabsTrigger value="right-sleeve">Right sleeve</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative flex h-[32rem] w-[64rem] flex-1 gap-4 pt-4">
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
              <div
                className={`bg-muted absolute ${
                  view === 'front'
                    ? 'right-0 bottom-0 h-[30rem] w-[2rem]'
                    : view === 'back'
                      ? 'bottom-0 left-0 h-[20rem] w-[2rem]'
                      : view === 'left-sleeve'
                        ? 'right-0 bottom-0 h-[9rem] w-[28rem]'
                        : 'bottom-0 left-0 h-[8rem] w-[5rem]'
                } `}
              />
              {view === 'front' && (
                <div className="bg-muted absolute bottom-0 left-0 h-[2rem] w-[3rem]" />
              )}
            </div>

            {/* Front */}
            {view === 'front' && (
              <div className="absolute -top-40 -right-50 z-30 h-[11.1rem] w-[80rem] bg-background-secondary" />
            )}
            {view === 'front' && (
              <div className="absolute top-10 right-0 z-20 h-[30rem] w-[32rem] bg-background-secondary" />
            )}
            {view === 'front' && (
              <div className="absolute top-122 -left-4 z-20 h-[2rem] w-[1rem] bg-background-secondary" />
            )}

            {/* Back */}
            {view === 'back' && (
              <div className="absolute -top-40 -right-50 z-30 h-[11.1rem] w-[100rem] bg-background-secondary" />
            )}
            {view === 'back' && (
              <div className="absolute top-0 right-256 z-20 h-[32rem] w-[30rem] bg-background-secondary" />
            )}

            {/* Left */}
            {view === 'left-sleeve' && (
              <div className="absolute top-10 right-0 z-20 h-[31rem] w-[32rem] bg-background-secondary" />
            )}
            {view === 'left-sleeve' && (
              <div className="absolute top-132 -left-4 z-20 h-[30rem] w-[40rem] bg-background-secondary" />
            )}
            {view === 'left-sleeve' && (
              <div className="absolute top-70 right-256 z-20 h-[45rem] w-[38rem] bg-background-secondary" />
            )}

            {/* Right */}
            {view === 'right-sleeve' && (
              <div className="absolute top-30 right-256 z-20 h-[26rem] w-[62rem] bg-background-secondary" />
            )}
            {view === 'right-sleeve' && (
              <div className="absolute top-132 right-220 z-20 h-[30rem] w-[78rem] bg-background-secondary" />
            )}

            {/* 3D Model Area */}
            <div className="relative z-20 h-[32rem] flex-grow">
              <OversizeTshirtModel
                texture={texture}
                view={view}
                color={shirtColor}
              />
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
