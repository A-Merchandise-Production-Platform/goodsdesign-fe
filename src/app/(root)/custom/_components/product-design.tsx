'use client';
import {
  BookMarked,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import * as THREE from 'three';

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
  view: string;
}

type SerializedDesign = Record<string, DesignObject[]>;

import OversizeTshirtModel from './tshirt-model';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SHIRT_COLORS = [
  { name: 'White', path: '/models/shirt/white.png', color: '#ffffff' },
  { name: 'Pink', path: '/models/shirt/pink.png', color: '#ffc0cb' },
  { name: 'Mint', path: '/models/shirt/mint.png', color: '#b2f2bb' },
  { name: 'Black', path: '/models/shirt/black.png', color: '#000000' },
  { name: 'Gray', path: '/models/shirt/gray.png', color: '#808080' },
  { name: 'Navy', path: '/models/shirt/navy.png', color: '#003366' },
];

function handleUploadClick() {
  const input = document.querySelector('#image-upload') as HTMLInputElement;
  input?.click();
}

export default function ProductDesigner() {
  const [view, setView] = useState('front');
  const [currentTexture, setCurrentTexture] = useState<string>(
    SHIRT_COLORS[0].path,
  );
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const [showColorDialog, setShowColorDialog] = useState(false);
  const [designs, setDesigns] = useState<Record<string, DesignObject[]>>({});

  // Add debounce mechanism for texture updates
  const textureUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingUpdateRef = useRef(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const textureCache = useRef<Record<string, HTMLImageElement>>({});
  const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const CANVAS_SIZE = 1280;

  const getDesignZoneLimits = (view: string) => {
    const scaleFactor = CANVAS_SIZE / 1280;

    const zones = {
      front: {
        minX: 160 * scaleFactor,
        maxX: 410 * scaleFactor,
        minY: 900 * scaleFactor,
        maxY: 1180 * scaleFactor,
      },
      back: {
        minX: 610 * scaleFactor,
        maxX: 880 * scaleFactor,
        minY: 870 * scaleFactor,
        maxY: 1180 * scaleFactor,
      },
      'left-sleeve': {
        minX: 650 * scaleFactor,
        maxX: 760 * scaleFactor,
        minY: 620 * scaleFactor,
        maxY: 720 * scaleFactor,
      },
      'right-sleeve': {
        minX: 1030 * scaleFactor,
        maxX: 1140 * scaleFactor,
        minY: 620 * scaleFactor,
        maxY: 720 * scaleFactor,
      },
    };

    return (
      zones[view as keyof typeof zones] || {
        minX: 500 * scaleFactor,
        maxX: 1350 * scaleFactor,
        minY: 2900 * scaleFactor,
        maxY: 3800 * scaleFactor,
      }
    );
  };

  // Initialize temporary canvas for texture generation
  useEffect(() => {
    // Create a temporary canvas for texture generation
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = CANVAS_SIZE;
    tempCanvas.height = CANVAS_SIZE;
    tempCanvasRef.current = tempCanvas;

    return () => {
      tempCanvasRef.current = null;
    };
  }, []);

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

    // Set up event listeners with debouncing
    fabricCanvasRef.current.on('object:modified', debounceTextureUpdate);
    fabricCanvasRef.current.on('object:added', e => {
      const obj = e.target as fabric.Object;
      applyClipPathToObject(obj, view);

      // Store the current view with the object
      obj.set('data', { ...obj.get('data'), view: view });

      // If object is fully outside, remove it
      if (isObjectFullyOutside(obj, view)) {
        fabricCanvasRef.current?.remove(obj);
      }

      debounceTextureUpdate();
    });

    fabricCanvasRef.current.on('mouse:down', e => {
      if (!e.target) return;

      const obj = e.target as fabric.Object;

      // If object is fully outside, remove it
      if (isObjectFullyOutside(obj, view)) {
        fabricCanvasRef.current?.remove(obj);
        fabricCanvasRef.current?.renderAll();
        debounceTextureUpdate();
      }
    });

    fabricCanvasRef.current.on('object:scaling', e => {
      const obj = e.target as fabric.Object;

      // If object is fully outside after scaling, remove it
      if (isObjectFullyOutside(obj, view)) {
        fabricCanvasRef.current?.remove(obj);
      }
    });

    fabricCanvasRef.current.on('object:removed', debounceTextureUpdate);

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

      // Clear any pending updates
      if (textureUpdateTimeoutRef.current) {
        clearTimeout(textureUpdateTimeoutRef.current);
      }
    };
  }, [view, currentTexture]); // Re-initialize when view or texture changes

  // Debounce texture updates to improve performance
  const debounceTextureUpdate = () => {
    pendingUpdateRef.current = true;

    if (textureUpdateTimeoutRef.current) {
      clearTimeout(textureUpdateTimeoutRef.current);
    }

    textureUpdateTimeoutRef.current = setTimeout(() => {
      if (pendingUpdateRef.current) {
        saveCurrentDesign();
        updateTextureOnModel();
        pendingUpdateRef.current = false;
      }
    }, 300); // 300ms debounce time
  };

  // Update canvas when view changes
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    // Update background texture
    loadBackgroundTexture(currentTexture);

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
      debounceTextureUpdate();
    };
    img.src = texturePath;
  };

  // Apply clip path to object
  const applyClipPathToObject = (obj: fabric.Object, view: string) => {
    if (!fabricCanvasRef.current) return;

    // Get the design zone limits for the CURRENT view only
    const limits = getDesignZoneLimits(view);

    // Create a clip path for the object based on the CURRENT view's design zone
    const clipPath = new fabric.Rect({
      left: limits.minX,
      top: limits.minY,
      width: limits.maxX - limits.minX,
      height: limits.maxY - limits.minY,
      absolutePositioned: true, // Ensures it applies correctly
    });

    // Apply the clip path to the object
    obj.set({
      clipPath,
    });

    fabricCanvasRef.current.renderAll();
  };

  // Check if an object is fully outside the design zone
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

    // Calculate scale to fit canvas while maintaining aspect ratio
    const canvasAspect =
      fabricCanvasRef.current.width! / fabricCanvasRef.current.height!;
    const imageAspect = img.width / img.height;

    let scaleX, scaleY;
    if (imageAspect > canvasAspect) {
      // Image is wider than canvas
      scaleX = scaleY = fabricCanvasRef.current.width! / img.width;
    } else {
      // Image is taller than canvas
      scaleX = scaleY = fabricCanvasRef.current.height! / img.height;
    }

    // Center the background image
    const left = (fabricCanvasRef.current.width! - img.width * scaleX) / 2;
    const top = (fabricCanvasRef.current.height! - img.height * scaleY) / 2;

    // Set properties
    fabricImage.set({
      scaleX: scaleX,
      scaleY: scaleY,
      left: left,
      top: top,
      originX: 'left',
      originY: 'top',
      selectable: false,
      evented: false,
    });

    // Set as background image
    fabricCanvasRef.current.backgroundImage = fabricImage;
    fabricCanvasRef.current.renderAll();
    debounceTextureUpdate();
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
      fill: 'rgba(0, 0, 0, 0)',
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

  // Update texture on 3D model - optimized version
  const updateTextureOnModel = () => {
    if (!fabricCanvasRef.current || !tempCanvasRef.current) return;

    const tempCanvas = tempCanvasRef.current;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) return;

    // Clear the canvas
    tempCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // First, draw the current background
    if (fabricCanvasRef.current.backgroundImage) {
      const bgImage = fabricCanvasRef.current.backgroundImage as fabric.Image;
      const bgElement = bgImage._element as HTMLImageElement;

      if (bgElement) {
        const { left = 0, top = 0, scaleX = 1, scaleY = 1 } = bgImage;
        tempCtx.drawImage(
          bgElement,
          0,
          0,
          bgElement.width,
          bgElement.height,
          left,
          top,
          bgElement.width * scaleX,
          bgElement.height * scaleY,
        );
      }
    }

    // Get all views
    const allViews = ['front', 'back', 'left-sleeve', 'right-sleeve'];

    // Prepare all images first to avoid async issues
    const imagePromises: Promise<void>[] = [];
    const loadedImages: Record<string, HTMLImageElement> = {};

    // First pass: load all images
    allViews.forEach(viewName => {
      const viewDesigns = designs[viewName] || [];

      viewDesigns.forEach(objData => {
        // Make sure src exists and is a string before using it as an index
        const src = objData.src;
        if (
          objData.type === 'image' &&
          typeof src === 'string' &&
          !loadedImages[src]
        ) {
          const promise = new Promise<void>(resolve => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = src; // Now we know src is a string

            if (img.complete) {
              loadedImages[src] = img; // Now we know src is a string
              resolve();
            } else {
              img.onload = () => {
                loadedImages[src] = img; // Now we know src is a string
                resolve();
              };
              img.onerror = () => {
                // Resolve even on error to avoid hanging
                resolve();
              };
            }
          });

          imagePromises.push(promise);
        }
      });
    });

    // Wait for all images to load, then render everything
    Promise.all(imagePromises).then(() => {
      // Second pass: draw all objects with their respective clip paths
      allViews.forEach(viewName => {
        const viewDesigns = designs[viewName] || [];

        viewDesigns.forEach(objData => {
          // Get the design zone limits for this object's view
          const limits = getDesignZoneLimits(objData.view);

          // Apply clipping path for this view
          tempCtx.save();
          tempCtx.beginPath();
          tempCtx.rect(
            limits.minX,
            limits.minY,
            limits.maxX - limits.minX,
            limits.maxY - limits.minY,
          );
          tempCtx.clip();

          if (objData.type === 'textbox' && objData.text) {
            // For text objects
            tempCtx.translate(
              objData.left + (objData.width * objData.scaleX) / 2,
              objData.top + (objData.height * objData.scaleY) / 2,
            );
            tempCtx.rotate(((objData.angle || 0) * Math.PI) / 180);
            tempCtx.font = `${objData.fontSize}px ${objData.fontFamily || 'Arial'}`;
            tempCtx.fillStyle = objData.fill || '#000000';
            tempCtx.textAlign = 'center';
            tempCtx.textBaseline = 'middle';
            tempCtx.fillText(objData.text, 0, 0);
          } else if (
            objData.type === 'image' &&
            typeof objData.src === 'string' &&
            loadedImages[objData.src]
          ) {
            // For image objects - we've explicitly checked objData.src is a string
            const img = loadedImages[objData.src];

            tempCtx.translate(
              objData.left + (objData.width * objData.scaleX) / 2,
              objData.top + (objData.height * objData.scaleY) / 2,
            );
            tempCtx.rotate(((objData.angle || 0) * Math.PI) / 180);
            tempCtx.drawImage(
              img,
              (-objData.width * objData.scaleX) / 2,
              (-objData.height * objData.scaleY) / 2,
              objData.width * objData.scaleX,
              objData.height * objData.scaleY,
            );
          }

          tempCtx.restore();
        });
      });

      // Create a new texture from the combined canvas
      const newTexture = new THREE.CanvasTexture(tempCanvas);
      newTexture.flipY = false;
      newTexture.colorSpace = THREE.SRGBColorSpace;

      // Dispose of previous texture to prevent memory leaks
      if (texture) {
        texture.dispose();
      }

      setTexture(newTexture);
    });
  };

  // Check if object data is outside its design zone
  const isObjectDataOutsideDesignZone = (
    objData: DesignObject,
    objView: string,
  ) => {
    const limits = getDesignZoneLimits(objView);

    // Calculate object bounds based on its data
    const objLeft = objData.left;
    const objTop = objData.top;
    const objWidth = objData.width * objData.scaleX;
    const objHeight = objData.height * objData.scaleY;
    const objRight = objLeft + objWidth;
    const objBottom = objTop + objHeight;

    // Check if any part of the object is outside the design zone
    return (
      objLeft < limits.minX ||
      objRight > limits.maxX ||
      objTop < limits.minY ||
      objBottom > limits.maxY
    );
  };

  // Helper function to draw images on the canvas
  const drawImageOnCanvas = (
    img: HTMLImageElement,
    objData: DesignObject,
    ctx: CanvasRenderingContext2D,
  ) => {
    ctx.save();
    ctx.translate(
      objData.left + (objData.width * objData.scaleX) / 2,
      objData.top + (objData.height * objData.scaleY) / 2,
    );
    ctx.rotate(((objData.angle || 0) * Math.PI) / 180);
    ctx.drawImage(
      img,
      (-objData.width * objData.scaleX) / 2,
      (-objData.height * objData.scaleY) / 2,
      objData.width * objData.scaleX,
      objData.height * objData.scaleY,
    );
    ctx.restore();
  };

  // Helper function to draw images on the canvas with clipping
  const drawImageOnCanvasWithClipping = (
    img: HTMLImageElement,
    objData: DesignObject,
    ctx: CanvasRenderingContext2D,
    limits: { minX: number; maxX: number; minY: number; maxY: number },
  ) => {
    ctx.save();

    // Apply clipping path for this object's view
    ctx.beginPath();
    ctx.rect(
      limits.minX,
      limits.minY,
      limits.maxX - limits.minX,
      limits.maxY - limits.minY,
    );
    ctx.clip();

    ctx.translate(
      objData.left + (objData.width * objData.scaleX) / 2,
      objData.top + (objData.height * objData.scaleY) / 2,
    );
    ctx.rotate(((objData.angle || 0) * Math.PI) / 180);
    ctx.drawImage(
      img,
      (-objData.width * objData.scaleX) / 2,
      (-objData.height * objData.scaleY) / 2,
      objData.width * objData.scaleX,
      objData.height * objData.scaleY,
    );
    ctx.restore();
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
        view: obj.get('data')?.view || view, // Store the view this object belongs to
      };

      if (obj instanceof fabric.Image) {
        const imgElement = obj.getElement() as HTMLImageElement;
        base.src = imgElement.src;
        base.type = 'image';
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

  // Update the loadSavedDesign function to ensure clip paths are applied correctly
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

    // Load saved objects for the CURRENT view only
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
        // Store the view with the object
        text.set('data', { view: objData.view || view });

        // Apply clip path for the CURRENT view
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
          // Store the view with the object
          fabricImage.set('data', { view: objData.view || view });

          // Apply clip path for the CURRENT view
          applyClipPathToObject(fabricImage, view);
          fabricCanvasRef.current?.add(fabricImage);
          fabricCanvasRef.current?.renderAll();
        };
        imgElement.src = objData.src;
      }
    });

    fabricCanvasRef.current.renderAll();
    debounceTextureUpdate();
  };

  // Load saved design when view changes
  useEffect(() => {
    loadSavedDesign();
    // Update the 3D model with all designs after loading the current view
    setTimeout(() => debounceTextureUpdate(), 100);
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

    // Store the current view with the text object
    text.set('data', { view: view });

    // Apply Clipping Path
    applyClipPathToObject(text, view);

    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();

    // Save the design and update 3D model
    saveCurrentDesign();
    debounceTextureUpdate();
  };

  // Update 3D model when designs change
  useEffect(() => {
    if (Object.keys(designs).length > 0) {
      debounceTextureUpdate();
    }
  }, [designs]);

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

        // Store the current view with the image
        fabricImage.set('data', { view: view });

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

        // Save the design and update the 3D model
        saveCurrentDesign();
        debounceTextureUpdate();
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

        // Save the design and update 3D model
        saveCurrentDesign();
        debounceTextureUpdate();
      }
    }
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
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => setShowColorDialog(true)}
            >
              <TShirt className="h-4 w-4" />
              <span>T-Shirt</span>
            </Button>

            <Dialog open={showColorDialog} onOpenChange={setShowColorDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Choose T-Shirt Color</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4 py-4">
                  {SHIRT_COLORS.map(colorOption => (
                    <button
                      key={colorOption.name}
                      className={`hover:bg-accent flex flex-col items-center gap-2 rounded-lg border p-3 ${
                        currentTexture === colorOption.path
                          ? 'border-primary'
                          : 'border-border'
                      }`}
                      onClick={() => {
                        // Save current design before changing color
                        saveCurrentDesign();
                        setCurrentTexture(colorOption.path);
                        setShowColorDialog(false);
                        // Load saved design after changing color
                        setTimeout(() => loadSavedDesign(), 0);
                      }}
                    >
                      <div
                        className="h-12 w-12 rounded-full border"
                        style={{ backgroundColor: colorOption.color }}
                      />
                      <span className="text-sm font-medium">
                        {colorOption.name}
                      </span>
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
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
              setCurrentTexture(currentTexture);
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
                        ? '-top-110 -left-110'
                        : '-top-110 -left-205'
                } `}
              >
                <canvas
                  ref={canvasRef}
                  className="p-4"
                  style={{
                    width: `${view === 'front' || view === 'back' ? '1280px' : '1600px'}`,
                    height: `${view === 'front' || view === 'back' ? '1280px' : '1600px'}`,
                    transform: 'scale(1)',
                    transformOrigin: 'top left',
                  }}
                />
              </div>

              {(view === 'left-sleeve' || view === 'right-sleeve') && (
                <div className="absolute bottom-0 left-0 h-[11rem] w-[31rem] bg-muted" />
              )}
              {(view === 'left-sleeve' || view === 'right-sleeve') && (
                <div className="bg-muted absolute top-0 left-0 h-[22rem] w-[4rem]" />
              )}
              {(view === 'left-sleeve' || view === 'right-sleeve') && (
                <div className="bg-muted absolute top-0 right-0 h-[22rem] w-[4rem]" />
              )}

              {view === 'front' && (
                <div className="bg-muted absolute bottom-0 left-0 h-[2rem] w-[31rem]" />
              )}

              <div className="bg-muted absolute top-0 left-0 h-[1rem] w-[31rem]" />
              <div className="bg-muted absolute bottom-0 left-0 h-[1rem] w-[31rem]" />
              <div className="bg-muted absolute right-0 bottom-0 h-[32rem] w-[2rem]" />
              <div className="bg-muted absolute bottom-0 left-0 h-[32rem] w-[2rem]" />
            </div>

            {/* Background Elements */}
            <div className="bg-background absolute -top-40 -right-50 z-30 h-[11.1rem] w-[110rem]" />
            <div className="bg-background absolute top-0 right-256 z-20 h-[63rem] w-[68rem]" />
            <div className="bg-background absolute top-4 -right-71 z-20 h-[33rem] w-[50rem]" />
            <div className="bg-background absolute top-132 -left-4 z-20 h-[30rem] w-[70rem]" />

            {/* 3D Model Area */}
            <div className="relative z-20 h-[32rem] flex-grow">
              <OversizeTshirtModel
                texture={texture}
                view={view}
                color="#FFFFFF"
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
