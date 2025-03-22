// useCanvasManager.ts
import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

export interface CanvasManagerOptions {
  canvasSize: number;
  view: string;
  onObjectModified?: () => void;
  onObjectAdded?: (obj: fabric.Object) => void;
  onObjectRemoved?: () => void;
}

export interface CanvasManager {
  fabricCanvas: fabric.Canvas | null;
  addDesignZoneIndicator: (view: string) => void;
  applyClipPathToObject: (obj: fabric.Object, view: string) => void;
  isObjectFullyOutside: (obj: fabric.Object, view: string) => boolean;
  getDesignZoneLimits: (view: string) => {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}

export function useCanvasManager(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: CanvasManagerOptions,
): CanvasManager {
  const { canvasSize, view, onObjectModified, onObjectAdded, onObjectRemoved } =
    options;
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  // Get design zone limits based on view
  const getDesignZoneLimits = (currentView: string) => {
    const scaleFactor = canvasSize / 1280;

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
      zones[currentView as keyof typeof zones] || {
        minX: 500 * scaleFactor,
        maxX: 1350 * scaleFactor,
        minY: 2900 * scaleFactor,
        maxY: 3800 * scaleFactor,
      }
    );
  };

  // Check if an object is fully outside the design zone
  const isObjectFullyOutside = (obj: fabric.Object, currentView: string) => {
    const limits = getDesignZoneLimits(currentView);
    const objBounds = obj.getBoundingRect();

    return (
      objBounds.left + objBounds.width < limits.minX ||
      objBounds.left > limits.maxX ||
      objBounds.top + objBounds.height < limits.minY ||
      objBounds.top > limits.maxY
    );
  };

  // Apply clip path to object
  const applyClipPathToObject = (obj: fabric.Object, currentView: string) => {
    if (!fabricCanvasRef.current) return;

    // Get the design zone limits for the current view only
    const limits = getDesignZoneLimits(currentView);

    // Create a clip path for the object based on the current view's design zone
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
  const addDesignZoneIndicator = (currentView: string) => {
    if (!fabricCanvasRef.current) return;

    // Remove existing design zone indicator
    const existingIndicator = fabricCanvasRef.current
      .getObjects()
      .find(obj => obj.get('data')?.type === 'designZone');

    if (existingIndicator) {
      fabricCanvasRef.current.remove(existingIndicator);
    }

    // Get design zone limits
    const limits = getDesignZoneLimits(currentView);

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

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    // Clean up previous canvas if it exists
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
    }

    // Create new Fabric.js canvas
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: canvasSize,
      height: canvasSize,
      selection: true,
      preserveObjectStacking: true,
      interactive: true,
    });

    // Set up event listeners
    if (onObjectModified) {
      fabricCanvasRef.current.on('object:modified', onObjectModified);
    }

    if (onObjectAdded) {
      fabricCanvasRef.current.on('object:added', e => {
        const obj = e.target as fabric.Object;
        onObjectAdded(obj);
      });
    }

    if (onObjectRemoved) {
      fabricCanvasRef.current.on('object:removed', onObjectRemoved);
    }

    // Add design zone indicator
    addDesignZoneIndicator(view);

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
      }
    };
  }, [view, canvasRef, onObjectModified, onObjectAdded, onObjectRemoved]);

  return {
    fabricCanvas: fabricCanvasRef.current,
    addDesignZoneIndicator,
    applyClipPathToObject,
    isObjectFullyOutside,
    getDesignZoneLimits,
  };
}

// useTextureManager.ts
import { useState, useEffect, useRef } from 'react';
import * as fabric from 'fabric';

export interface TextureManager {
  loadTexture: (texturePath: string) => void;
}

export function useTextureManager(options: {
  fabricCanvas: fabric.Canvas | null;
  texturePath: string;
  onTextureUpdate?: () => void;
}): TextureManager {
  const { fabricCanvas, texturePath, onTextureUpdate } = options;
  const textureCache = useRef<Record<string, HTMLImageElement>>({});

  const setBackgroundImage = (img: HTMLImageElement) => {
    if (!fabricCanvas) return;

    // Create a fabric image object
    const fabricImage = new fabric.Image(img);

    // Calculate scale to fit canvas while maintaining aspect ratio
    const canvasAspect = fabricCanvas.width! / fabricCanvas.height!;
    const imageAspect = img.width / img.height;

    let scaleX, scaleY;
    if (imageAspect > canvasAspect) {
      // Image is wider than canvas
      scaleX = scaleY = fabricCanvas.width! / img.width;
    } else {
      // Image is taller than canvas
      scaleX = scaleY = fabricCanvas.height! / img.height;
    }

    // Center the background image
    const left = (fabricCanvas.width! - img.width * scaleX) / 2;
    const top = (fabricCanvas.height! - img.height * scaleY) / 2;

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
    fabricCanvas.backgroundImage = fabricImage;
    fabricCanvas.renderAll();

    if (onTextureUpdate) {
      onTextureUpdate();
    }
  };

  const loadTexture = (path: string) => {
    if (!fabricCanvas) return;

    // Check if texture is already cached
    if (textureCache.current[path]) {
      setBackgroundImage(textureCache.current[path]);
      return;
    }

    // Load texture
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      textureCache.current[path] = img;
      setBackgroundImage(img);
    };
    img.onerror = err => {
      console.error('Error loading texture:', err);
      // Fallback to a plain background if image fails to load
      if (fabricCanvas) {
        fabricCanvas.backgroundColor = '#f0f0f0';
        fabricCanvas.renderAll();
        if (onTextureUpdate) {
          onTextureUpdate();
        }
      }
    };
    img.src = path;
  };

  // Load texture when path changes
  useEffect(() => {
    if (fabricCanvas && texturePath) {
      loadTexture(texturePath);
    }
  }, [fabricCanvas, texturePath]);

  return {
    loadTexture,
  };
}

// useDesignManager.ts
import { useState, useCallback } from 'react';
import * as fabric from 'fabric';
import { DesignObject, SerializedDesign } from '@/types/shirt';

export interface DesignManager {
  designs: SerializedDesign;
  saveCurrentDesign: () => void;
  loadSavedDesign: () => void;
  clearCurrentDesign: () => void;
}

export function useDesignManager(options: {
  fabricCanvas: fabric.Canvas | null;
  view: string;
  applyClipPathToObject: (obj: fabric.Object, view: string) => void;
}): DesignManager {
  const { fabricCanvas, view, applyClipPathToObject } = options;
  const [designs, setDesigns] = useState<SerializedDesign>({});

  // Save current canvas state
  const saveCurrentDesign = useCallback(() => {
    if (!fabricCanvas) return;

    const objects = fabricCanvas.getObjects().filter(obj => {
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
  }, [fabricCanvas, view]);

  // Load saved design
  const loadSavedDesign = useCallback(() => {
    if (!fabricCanvas) return;

    const savedDesign = designs[view];
    if (!savedDesign) return;

    // Clear current objects except design zone
    clearCurrentDesign();

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
        fabricCanvas.add(text);
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
          fabricCanvas.add(fabricImage);
          fabricCanvas.renderAll();
        };
        imgElement.src = objData.src;
      }
    });

    fabricCanvas.renderAll();
  }, [fabricCanvas, designs, view, applyClipPathToObject]);

  // Clear current design (except design zone)
  const clearCurrentDesign = useCallback(() => {
    if (!fabricCanvas) return;

    const objects = fabricCanvas.getObjects();
    objects.forEach(obj => {
      if (obj.get('data')?.type !== 'designZone') {
        fabricCanvas.remove(obj);
      }
    });

    fabricCanvas.renderAll();
  }, [fabricCanvas]);

  return {
    designs,
    saveCurrentDesign,
    loadSavedDesign,
    clearCurrentDesign,
  };
}

// use3DModelManager.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import * as fabric from 'fabric';
import { SerializedDesign } from '@/types/shirt';

export interface ModelManager {
  texture: THREE.CanvasTexture | null;
  updateTextureOnModel: () => void;
}

export function use3DModelManager(options: {
  designs: SerializedDesign;
  backgroundTexturePath: string;
  canvasSize: number;
}): ModelManager {
  const { designs, canvasSize } = options;
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingUpdateRef = useRef(false);

  // Get design zone limits based on view
  const getDesignZoneLimits = (view: string) => {
    const scaleFactor = canvasSize / 1280;

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
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvasSize;
    tempCanvas.height = canvasSize;
    tempCanvasRef.current = tempCanvas;

    return () => {
      tempCanvasRef.current = null;
    };
  }, [canvasSize]);

  // Debounce texture updates to improve performance
  const debounceTextureUpdate = useCallback(() => {
    pendingUpdateRef.current = true;

    if (textureUpdateTimeoutRef.current) {
      clearTimeout(textureUpdateTimeoutRef.current);
    }

    textureUpdateTimeoutRef.current = setTimeout(() => {
      if (pendingUpdateRef.current) {
        updateTextureOnModel();
        pendingUpdateRef.current = false;
      }
    }, 300); // 300ms debounce time
  }, []);

  // Update texture on 3D model
  const updateTextureOnModel = useCallback(() => {
    if (!tempCanvasRef.current) return;

    const tempCanvas = tempCanvasRef.current;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) return;

    // Clear the canvas
    tempCtx.clearRect(0, 0, canvasSize, canvasSize);

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
            tempCtx.save();
            tempCtx.translate(objData.left, objData.top);
            tempCtx.rotate(((objData.angle || 0) * Math.PI) / 180);
            tempCtx.font = `${objData.fontSize}px ${objData.fontFamily || 'Arial'}`;
            tempCtx.fillStyle = objData.fill || '#000000';
            tempCtx.textAlign = 'left';
            tempCtx.textBaseline = 'top';
            tempCtx.fillText(objData.text, 0, 0);
            tempCtx.restore();
          } else if (
            objData.type === 'image' &&
            typeof objData.src === 'string' &&
            loadedImages[objData.src]
          ) {
            // For image objects
            const img = loadedImages[objData.src];

            tempCtx.save();
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
  }, [designs, canvasSize, texture]);

  // Update 3D model when designs change
  useEffect(() => {
    if (Object.keys(designs).length > 0) {
      debounceTextureUpdate();
    }
  }, [designs, debounceTextureUpdate]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (textureUpdateTimeoutRef.current) {
        clearTimeout(textureUpdateTimeoutRef.current);
      }
      if (texture) {
        texture.dispose();
      }
    };
  }, [texture]);

  return {
    texture,
    updateTextureOnModel,
  };
}
