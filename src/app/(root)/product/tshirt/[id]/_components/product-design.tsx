'use client';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as fabric from 'fabric';
import DesignHeader from './design-header';
import DesignSidebar from './design-sidebar';
import DesignCanvas from './design-canvas';
import DesignFooter from './design-footer';
import ViewSelector from './view-selector';
import { SHIRT_COLORS } from './shirt-colors';

// Types
import type { SerializedDesign } from '@/types/shirt';
import type { DesignObject } from '@/types/design-object';

interface DesignPosition {
  __typename?: 'DesignPositionEntity';
  designJSON?: any[] | null;
  positionType?: {
    __typename?: 'ProductPositionTypeEntity';
    id: string;
    positionName: string;
    basePrice: number;
  } | null;
}

interface ProductDesignerComponentProps {
  initialDesigns?: DesignPosition[] | null;
  onUpload?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<string | null | undefined>;
  onUpdatePosition?: (options: {
    variables: {
      input: {
        designId: string;
        productPositionTypeId: string;
        designJSON: any;
      };
    };
  }) => void;
  designId?: string;
}

type ProductDesignerProps = SerializedDesign;

export default function ProductDesigner({
  initialDesigns = [],
  onUpload,
  onUpdatePosition,
  designId,
}: ProductDesignerComponentProps) {
  const [view, setView] = useState('front');
  const [currentTexture, setCurrentTexture] = useState<string>(
    SHIRT_COLORS[0].path,
  );
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const [showColorDialog, setShowColorDialog] = useState(false);
  const [designs, setDesigns] = useState<ProductDesignerProps>(() => {
    if (!initialDesigns) return {};

    const transformedDesigns: ProductDesignerProps = {};

    initialDesigns.forEach(position => {
      const viewName = position.positionType?.positionName.toLowerCase() || '';
      if (!position.designJSON) return;

      const designs = position.designJSON.map(design => ({
        type: design.type || '',
        left: design.left || 0,
        top: design.top || 0,
        width: design.width || 0,
        height: design.height || 0,
        scaleX: design.scaleX || 1,
        scaleY: design.scaleY || 1,
        angle: design.angle || 0,
        view: viewName,
        ...(design.type === 'image' && { src: design.src }),
        ...(design.type === 'textbox' && {
          text: design.text || '',
          fontSize: design.fontSize || 40,
          fill: design.fill || '#000000',
          fontFamily: design.fontFamily || 'Arial',
        }),
      })) as DesignObject[];

      transformedDesigns[viewName] = designs;
    });

    return transformedDesigns;
  });

  // Refs for canvas management
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const textureCache = useRef<Record<string, HTMLImageElement>>({});
  const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Add debounce mechanism for texture updates
  const textureUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingUpdateRef = useRef(false);

  const CANVAS_SIZE = 1280;

  // Get design zone limits based on view
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
      'left sleeve': {
        minX: 650 * scaleFactor,
        maxX: 760 * scaleFactor,
        minY: 620 * scaleFactor,
        maxY: 720 * scaleFactor,
      },
      'right sleeve': {
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
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = CANVAS_SIZE;
    tempCanvas.height = CANVAS_SIZE;
    tempCanvasRef.current = tempCanvas;

    return () => {
      tempCanvasRef.current = null;
    };
  }, []);

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

  // Update texture on 3D model
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
    const allViews = ['front', 'back', 'left sleeve', 'right sleeve'];

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
            img.src = src;

            if (img.complete) {
              loadedImages[src] = img;
              resolve();
            } else {
              img.onload = () => {
                loadedImages[src] = img;
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
            // Calculate the center point of the text
            const centerX = objData.left;
            const centerY = objData.top;

            tempCtx.save();
            // Move to the position where the text should be drawn
            tempCtx.translate(centerX, centerY);
            // Apply rotation
            tempCtx.rotate(((objData.angle || 0) * Math.PI) / 180);
            // Set text properties
            tempCtx.font = `${objData.fontSize}px ${objData.fontFamily || 'Arial'}`;
            tempCtx.fillStyle = objData.fill || '#000000';
            tempCtx.textAlign = 'left';
            tempCtx.textBaseline = 'top';
            // Draw text at origin (0,0) since we've already translated
            tempCtx.fillText(objData.text, 0, 0);
            tempCtx.restore();
          } else if (
            objData.type === 'image' &&
            typeof objData.src === 'string' &&
            loadedImages[objData.src]
          ) {
            // For image objects
            const img = loadedImages[objData.src];

            // Calculate the center point of the image
            const centerX = objData.left;
            const centerY = objData.top;
            const width = objData.width * objData.scaleX;
            const height = objData.height * objData.scaleY;

            tempCtx.save();
            // Move to the position where the image should be drawn
            tempCtx.translate(centerX, centerY);
            // Apply rotation around this point
            tempCtx.rotate(((objData.angle || 0) * Math.PI) / 180);
            // Draw the image with its top-left corner at the origin (0,0)
            tempCtx.drawImage(img, 0, 0, width, height);
            tempCtx.restore();
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
      const newDesigns: ProductDesignerProps = {
        ...prev,
        [view]: serializedObjects,
      };
      return newDesigns;
    });
  };

  // Load saved design
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
  }, [view, currentTexture]);

  // Load saved design when view changes
  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    loadSavedDesign();
  }, [view]);

  // Update 3D model when designs change
  useEffect(() => {
    if (Object.keys(designs).length > 0) {
      debounceTextureUpdate();

      // Find the current position type for this view
      const currentPosition = initialDesigns?.find(
        position => position?.positionType?.positionName.toLowerCase() === view,
      );

      // Update position if we have all required data
      if (
        onUpdatePosition &&
        designId &&
        currentPosition?.positionType?.id &&
        designs[view]
      ) {
        onUpdatePosition({
          variables: {
            input: {
              designId: designId,
              productPositionTypeId: currentPosition.positionType.id,
              designJSON: designs[view],
            },
          },
        });
      }
    }
  }, [designs]);

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !e.target.files ||
      e.target.files.length === 0 ||
      !fabricCanvasRef.current
    )
      return;

    let imageUrl: string;

    if (onUpload) {
      // Use the provided upload handler
      const uploadedUrl = await onUpload(e);
      if (!uploadedUrl) {
        e.target.value = '';
        return;
      }
      imageUrl = uploadedUrl;
    } else {
      // Fallback to local handling
      const file = e.target.files[0];
      const reader = new FileReader();
      imageUrl = await new Promise(resolve => {
        reader.onload = event =>
          resolve(event.target?.result?.toString() || '');
        reader.readAsDataURL(file);
      });
    }

    const imageElement = new Image();
    imageElement.crossOrigin = 'anonymous';
    imageElement.src = imageUrl;

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
        top: limits.minY + (maxHeight - (fabricImage.height ?? 0) * scale) / 2,
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
      // Save the design and trigger texture update
      // Note: debounceTextureUpdate already includes saveCurrentDesign
      debounceTextureUpdate();
    };

    e.target.value = '';
  };

  // Handle key press (delete)
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

  // Add text to canvas
  const addText = () => {
    if (!fabricCanvasRef.current) return;

    const limits = getDesignZoneLimits(view);
    const text = new fabric.IText('Edit this text', {
      left: limits.minX + 20, // Add some padding from the left edge
      top: limits.minY + 20, // Add some padding from the top edge
      fontFamily: 'Arial',
      fontSize: 40,
      fill: '#000000',
      originX: 'left',
      originY: 'top',
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

  const handleColorChange = (texturePath: string) => {
    setCurrentTexture(texturePath);
    setShowColorDialog(false);
  };

  const handleViewChange = (newView: string) => {
    // Just update the view, useEffect will handle loading the saved design
    setView(newView);
  };

  return (
    <div className="flex h-screen flex-col">
      <DesignHeader onSave={saveCurrentDesign} />

      <div className="flex flex-1">
        <DesignSidebar
          showColorDialog={showColorDialog}
          setShowColorDialog={setShowColorDialog}
          currentTexture={currentTexture}
          onColorChange={handleColorChange}
          onImageUpload={handleImageUpload}
          onAddText={addText}
          designs={designs[view] || []}
          onReorderLayers={(startIndex: number, endIndex: number) => {
            if (!fabricCanvasRef.current) return;

            // Get current view's designs
            const currentDesigns = [...(designs[view] || [])];

            // Move the layer
            const [removed] = currentDesigns.splice(startIndex, 1);
            currentDesigns.splice(endIndex, 0, removed);

            // Update state
            setDesigns(prev => ({
              ...prev,
              [view]: currentDesigns,
            }));

            // Re-render canvas with new order
            const canvas = fabricCanvasRef.current;
            const objects = canvas
              .getObjects()
              .filter(obj => obj.get('data')?.type !== 'designZone');

            // Clear canvas except design zone
            objects.forEach(obj => canvas.remove(obj));

            // Add objects in new order
            currentDesigns.forEach(design => {
              if (design.type === 'textbox' && design.text) {
                const text = new fabric.IText(design.text, {
                  left: design.left,
                  top: design.top,
                  fontSize: design.fontSize,
                  fill: design.fill,
                  fontFamily: design.fontFamily,
                  scaleX: design.scaleX,
                  scaleY: design.scaleY,
                  angle: design.angle,
                });
                text.set('data', { view: design.view });
                applyClipPathToObject(text, view);
                canvas.add(text);
              } else if (design.type === 'image' && design.src) {
                const imgElement = new Image();
                imgElement.crossOrigin = 'anonymous';
                imgElement.onload = () => {
                  const fabricImage = new fabric.Image(imgElement);
                  fabricImage.set({
                    left: design.left,
                    top: design.top,
                    scaleX: design.scaleX,
                    scaleY: design.scaleY,
                    angle: design.angle,
                  });
                  fabricImage.set('data', { view: design.view });
                  applyClipPathToObject(fabricImage, view);
                  canvas.add(fabricImage);
                  canvas.renderAll();
                };
                imgElement.src = design.src;
              }
            });

            canvas.renderAll();
            debounceTextureUpdate();
          }}
        />

        <div className="flex flex-1 flex-col">
          <ViewSelector view={view} onViewChange={handleViewChange} />

          <DesignCanvas
            canvasRef={canvasRef as any}
            view={view}
            texture={texture}
          />
        </div>
      </div>

      <DesignFooter />
    </div>
  );
}
