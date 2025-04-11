'use client';
import * as fabric from 'fabric';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import * as THREE from 'three';

import { useGetProductInformationByIdQuery } from '@/graphql/generated/graphql';
// Types
import { DesignObject } from '@/types/design-object';

import DesignCanvas from './design-canvas';
import DesignFooter from './design-footer';
import DesignHeader from './design-header';
import DesignSidebar from './design-sidebar';
import { SHIRT_COLORS } from './shirt-colors';
import ViewSelector from './view-selector';

interface SerializedDesign {
  [key: string]: DesignObject[];
}

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

interface ProductVariant {
  id: string;
  price?: number | null;
  color?: string | null;
  size?: string | null;
  model?: string | null;
  __typename?: 'SystemConfigVariantEntity';
}

interface ProductDesignerComponentProps {
  initialDesigns?: DesignPosition[] | null;
  productVariant?: ProductVariant | null;
  onUpload?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<string | null | undefined>;
  onThumbnail?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<string | null | undefined>;
  onUpdateVariant?: (options: {
    variables: {
      updateProductDesignId: string;
      input: { systemConfigVariantId: string };
    };
  }) => void;
  onUpdatePosition?: (options: {
    variables: {
      input: {
        designId: string;
        productPositionTypeId: string;
        designJSON: any;
      };
    };
  }) => void;
  onCreateCartItem?: (options: {
    variables: {
      createCartItemInput: {
        designId: string;
        quantity: number;
      };
    };
  }) => void;
  cartLoading?: boolean;
  designId?: string;
  uploadLoading?: boolean;
}

export default function ProductDesigner({
  initialDesigns = [],
  productVariant,
  onUpload,
  onThumbnail,
  onUpdateVariant,
  onUpdatePosition,
  onCreateCartItem,
  cartLoading,
  designId,
  uploadLoading,
}: ProductDesignerComponentProps) {
  // State for 3D model export
  const [modelExportCallback, setModelExportCallback] = useState<
    ((dataUrl: string) => void) | undefined
  >();

  // Handle export of 3D model
  const handleExport = () => {
    console.log('Exporting 3D model...');
    const handleModelCapture = async (dataUrl: string) => {
      try {
        // Download 3D view
        const link3d = document.createElement('a');
        link3d.href = dataUrl;
        link3d.download = `tshirt-3d-${view}.png`;
        document.body.appendChild(link3d);
        link3d.click();
        document.body.removeChild(link3d);

        // Download 2D canvas if available
        if (fabricCanvasRef.current) {
          try {
            const canvas2dDataUrl = fabricCanvasRef.current.toDataURL({
              format: 'png',
              quality: 1,
            });

            const link2d = document.createElement('a');
            link2d.href = canvas2dDataUrl;
            link2d.download = `tshirt-2d-${view}.png`;
            document.body.appendChild(link2d);
            link2d.click();
            document.body.removeChild(link2d);
          } catch (e) {
            console.error('Canvas export error:', e);
            // Show user-friendly error message
            alert(
              'Unable to export 2D view. Please try again or contact support.',
            );
          }
        }
      } catch (error) {
        console.error('Error handling export:', error);
      } finally {
        setModelExportCallback(undefined);
      }
    };
    setModelExportCallback(() => handleModelCapture);
  };
  const { data: infoData } = useGetProductInformationByIdQuery({
    variables: {
      productId: 'prod001',
    },
  });

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [view, setView] = useState('front');
  const [currentTexture, setCurrentTexture] = useState<string>(() => {
    if (productVariant?.color) {
      // Find matching color in SHIRT_COLORS
      const matchingColor = SHIRT_COLORS.find(
        color =>
          color.color.toLowerCase() === productVariant.color?.toLowerCase(),
      );
      return matchingColor?.path || SHIRT_COLORS[0].path;
    }
    return SHIRT_COLORS[0].path;
  });

  useEffect(() => {
    if (productVariant?.color) {
      const matchingColor = SHIRT_COLORS.find(
        color =>
          color.name.toLowerCase() === productVariant.color?.toLowerCase(),
      );
      if (matchingColor?.path) {
        setCurrentTexture(matchingColor.path);
        setSelectedColor(productVariant.color);
      }
    }
  }, [productVariant]);

  useEffect(() => {
    if (infoData?.product.variants && infoData.product.variants.length > 0) {
      const firstVariant = infoData.product.variants[0];
      if (firstVariant.size) setSelectedSize(firstVariant.size);
      if (firstVariant.color) setSelectedColor(firstVariant.color);
    }
  }, [infoData]);

  const getVariant = (size: string, color: string) => {
    const variant = infoData?.product.variants?.find(
      v => v.size === size && v.color === color,
    );

    if (!variant) return undefined;

    return {
      id: variant.id,
      price: variant.price ?? 0, // Provide default value for nullable price
      color: variant.color ?? '', // Provide default value for nullable color
      size: variant.size ?? '', // Provide default value for nullable size
      model: variant.model ?? '', // Provide default value for nullable model
    };
  };

  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const [showColorDialog, setShowColorDialog] = useState(false);
  const [designsInitialized, setDesignsInitialized] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [designs, setDesigns] = useState<SerializedDesign>(() => {
    if (!initialDesigns) return {};

    // Add timeout to initialize designs after 2 seconds
    setTimeout(() => {
      setDesignsInitialized(true);
    }, 1000);

    const transformedDesigns: SerializedDesign = {};

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
  const fabricCanvasRef = useRef<any>(null);
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
        // Only update texture model during movement
        updateTextureOnModel();
        pendingUpdateRef.current = false;
      }
    }, 300); // 300ms debounce time
  };

  // Check if an object is fully outside the design zone
  const isObjectFullyOutside = (obj: any, view: string) => {
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
  const applyClipPathToObject = (obj: any, view: string) => {
    if (!fabricCanvasRef.current) return;

    // Get the design zone limits for the CURRENT view only
    const limits = getDesignZoneLimits(view);

    // Create a clip path for the object based on the CURRENT view's design zone
    const clipPath = new (fabric as any).Rect({
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
      .find((obj: any) => obj.get('data')?.type === 'designZone');
    if (existingIndicator) {
      fabricCanvasRef.current.remove(existingIndicator);
    }

    // Get design zone limits
    const limits = getDesignZoneLimits(view);

    // Create design zone indicator with a more visible style
    const designZone = new (fabric as any).Rect({
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
    const fabricImage = new (fabric as any).Image(img);

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

  const updateTextureOnModel = () => {
    if (!fabricCanvasRef.current || !tempCanvasRef.current) return;

    const tempCanvas = tempCanvasRef.current;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) return;

    // Clear the canvas
    tempCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // First, draw the current background
    if (fabricCanvasRef.current.backgroundImage) {
      const bgImage = fabricCanvasRef.current.backgroundImage as any;
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

    const objects = fabricCanvasRef.current.getObjects().filter((obj: any) => {
      // Filter out design zone indicator
      return obj.get('data')?.type !== 'designZone';
    });

    // Map canvas objects directly to our design objects format
    const currentDesigns = objects.map((obj: any) => {
      const base: DesignObject = {
        view: obj.get('data')?.view || view,
        type: obj.type || '',
        layer: obj.layer || 1,
        left: obj.left || 0,
        top: obj.top || 0,
        width: obj.width || 0,
        height: obj.height || 0,
        scaleX: obj.scaleX || 1,
        scaleY: obj.scaleY || 1,
        angle: obj.angle || 0,
      };

      if (obj instanceof (fabric as any).Image) {
        const imgElement = obj.getElement() as HTMLImageElement;
        base.src = imgElement.src;
        base.type = 'image';
      } else if (obj instanceof (fabric as any).IText) {
        base.type = 'textbox';
        base.text = obj.text || '';
        base.fontSize = obj.fontSize || 40;
        base.fill = typeof obj.fill === 'string' ? obj.fill : '#000000';
        base.fontFamily = obj.fontFamily || 'Arial';
      }

      return base;
    });

    const previousDesigns = designs[view] || [];
    const hasChanges =
      JSON.stringify(previousDesigns) !== JSON.stringify(currentDesigns);

    // Update state directly with the new designs
    setDesigns(prev => {
      return {
        ...prev,
        [view]: currentDesigns,
      };
    });

    // Then, if there are changes, call onUpdatePosition in a separate effect
    if (hasChanges && onUpdatePosition && designId) {
      // Find the current position type for this view
      const currentPosition = initialDesigns?.find(
        position => position?.positionType?.positionName.toLowerCase() === view,
      );

      if (currentPosition?.positionType?.id) {
        const positionTypeId = currentPosition.positionType.id;

        // Use setTimeout to push this to the next tick, avoiding the setState in render error
        setTimeout(() => {
          onUpdatePosition({
            variables: {
              input: {
                designId: designId,
                productPositionTypeId: positionTypeId,
                designJSON: currentDesigns,
              },
            },
          });
        }, 0);
      }
    }
  };

  // Load saved design
  const loadSavedDesign = () => {
    if (!fabricCanvasRef.current) return;

    const savedDesign = designs[view];
    if (!savedDesign) return;

    // Clear current objects except design zone
    const objects = fabricCanvasRef.current.getObjects();
    objects.forEach((obj: any) => {
      if (obj.get('data')?.type !== 'designZone') {
        fabricCanvasRef.current?.remove(obj);
      }
    });

    // Load saved objects for the CURRENT view only
    savedDesign.forEach((objData: DesignObject) => {
      if (objData.type === 'textbox' && objData.text) {
        const text = new (fabric as any).IText(objData.text, {
          left: objData.left,
          top: objData.top,
          fontSize: objData.fontSize,
          fill: objData.fill,
          fontFamily: objData.fontFamily,
          scaleX: objData.scaleX,
          scaleY: objData.scaleY,
          angle: objData.angle,
          layer: objData.layer || 1,
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
          const fabricImage = new (fabric as any).Image(imgElement);
          fabricImage.set({
            left: objData.left,
            top: objData.top,
            scaleX: objData.scaleX,
            scaleY: objData.scaleY,
            angle: objData.angle,
            layer: objData.layer || 1,
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
    console.log(designs);
    if (!canvasRef.current) return;

    // Clean up previous canvas if it exists
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
    }

    // Create new Fabric.js canvas
    fabricCanvasRef.current = new (fabric as any).Canvas(canvasRef.current, {
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      selection: true,
      preserveObjectStacking: true,
      interactive: true,
    });

    // Set up event listeners with debouncing
    fabricCanvasRef.current.on('object:moving', debounceTextureUpdate); // Update 3D model during movement
    fabricCanvasRef.current.on('object:scaling', debounceTextureUpdate); // Update 3D model during scaling
    fabricCanvasRef.current.on('object:rotating', debounceTextureUpdate); // Update 3D model during rotation

    // Save design only when modification is complete
    fabricCanvasRef.current.on('mouse:up', () => {
      if (fabricCanvasRef.current?.getActiveObjects().length) {
        saveCurrentDesign();
      }
    });

    fabricCanvasRef.current.on('object:added', (e: any) => {
      const obj = e.target;
      applyClipPathToObject(obj, view);

      // Store the current view with the object
      obj.set('data', { ...obj.get('data'), view: view });

      // If object is fully outside, remove it
      if (isObjectFullyOutside(obj, view)) {
        fabricCanvasRef.current?.remove(obj);
      }

      debounceTextureUpdate();
    });

    fabricCanvasRef.current.on('mouse:down', (e: any) => {
      if (!e.target) return;

      const obj = e.target;

      // If object is fully outside, remove it
      if (isObjectFullyOutside(obj, view)) {
        fabricCanvasRef.current?.remove(obj);
        fabricCanvasRef.current?.renderAll();
        debounceTextureUpdate();
      }
    });

    // Handle scaling boundary check
    fabricCanvasRef.current.on('object:scaling', (e: any) => {
      const obj = e.target;

      // If object is fully outside after scaling, remove it
      if (isObjectFullyOutside(obj, view)) {
        fabricCanvasRef.current?.remove(obj);
        saveCurrentDesign(); // Save when object is removed
      }
    });

    fabricCanvasRef.current.on('object:removed', debounceTextureUpdate);

    // Load background texture
    loadBackgroundTexture(currentTexture);

    // Add design zone indicator
    addDesignZoneIndicator(view);

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);

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
  }, [view]);

  // This useEffect only handles texture changes
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    // Load background texture
    loadBackgroundTexture(currentTexture);
  }, [currentTexture, fabricCanvasRef.current]);

  // Load saved design when view changes or after initialization delay
  useEffect(() => {
    if (!fabricCanvasRef.current || !designsInitialized) return;
    loadSavedDesign();
  }, [view, designsInitialized, currentTexture]);

  // Update 3D model when designs change
  useEffect(() => {
    if (Object.keys(designs).length > 0) {
      debounceTextureUpdate();
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
      const fabricImage = new (fabric as any).Image(imageElement);
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
        layer: 1, // Initialize with default layer 1
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
      // Update texture for live preview
      debounceTextureUpdate();
      // Save design and trigger API update
      saveCurrentDesign();
    };

    e.target.value = '';
  };

  // Handle key press (delete)
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Delete' && fabricCanvasRef.current) {
      const activeObjects = fabricCanvasRef.current.getActiveObjects();
      if (activeObjects.length > 0) {
        activeObjects.forEach((object: any) => {
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
    const text = new (fabric as any).IText('Edit this text', {
      left: limits.minX + 20, // Add some padding from the left edge
      top: limits.minY + 20, // Add some padding from the top edge
      fontFamily: 'Arial',
      fontSize: 40,
      fill: '#000000',
      originX: 'left',
      originY: 'top',
      selectable: true,
      evented: true,
      layer: 1, // Initialize with default layer 1
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
      <DesignHeader
        onSave={async () => {
          saveCurrentDesign();

          // Then capture and update thumbnail
          const captureCallback = async (dataUrl: string) => {
            try {
              // Convert dataUrl to File
              const response = await fetch(dataUrl);
              const blob = await response.blob();
              const file = new File([blob], `tshirt-3d-${view}.png`, {
                type: 'image/png',
              });

              // Create a mock event with the file
              const mockEvent = {
                target: {
                  files: [file],
                },
              } as unknown as React.ChangeEvent<HTMLInputElement>;

              // Upload thumbnail using the provided callback
              if (onThumbnail) {
                await onThumbnail(mockEvent);
              }
            } catch (error) {
              console.error('Error capturing thumbnail:', error);
            } finally {
              setModelExportCallback(undefined);
            }
          };

          // Set the callback to capture the model view
          setModelExportCallback(() => captureCallback);
        }}
        onExport={handleExport} // Keep the download button functionality
      />

      <div className="flex flex-1">
        <DesignSidebar
          showColorDialog={showColorDialog}
          setShowColorDialog={setShowColorDialog}
          currentTexture={currentTexture}
          onColorChange={handleColorChange}
          onImageUpload={handleImageUpload}
          onAddText={addText}
          designs={designs[view] || []}
          productInfo={infoData?.product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          onSizeChange={setSelectedSize}
          getVariant={getVariant}
          onUpdateVariant={onUpdateVariant}
          designId={designId}
          uploadLoading={uploadLoading}
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
              .filter((obj: any) => obj.get('data')?.type !== 'designZone');

            // Clear canvas except design zone
            objects.forEach((obj: any) => canvas.remove(obj));

            // Add objects in new order
            currentDesigns.forEach(design => {
              if (design.type === 'textbox' && design.text) {
                const text = new (fabric as any).IText(design.text, {
                  left: design.left,
                  top: design.top,
                  fontSize: design.fontSize,
                  fill: design.fill,
                  fontFamily: design.fontFamily,
                  scaleX: design.scaleX,
                  scaleY: design.scaleY,
                  angle: design.angle,
                  layer: design.layer || 1,
                });
                text.set('data', { view: design.view });
                applyClipPathToObject(text, view);
                canvas.add(text);
              } else if (design.type === 'image' && design.src) {
                const imgElement = new Image();
                imgElement.crossOrigin = 'anonymous';
                imgElement.onload = () => {
                  const fabricImage = new (fabric as any).Image(imgElement);
                  fabricImage.set({
                    left: design.left,
                    top: design.top,
                    scaleX: design.scaleX,
                    scaleY: design.scaleY,
                    angle: design.angle,
                    layer: design.layer || 1,
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

            // Find the position type ID matching the current view
            const positionType = initialDesigns?.find(
              pos =>
                pos.positionType?.positionName.toLowerCase() ===
                view.toLowerCase(),
            );

            // Update position after reordering
            if (
              onUpdatePosition &&
              designId &&
              positionType?.positionType?.id
            ) {
              onUpdatePosition({
                variables: {
                  input: {
                    designId: designId,
                    productPositionTypeId: positionType.positionType.id,
                    designJSON: currentDesigns,
                  },
                },
              });
            }
          }}
        />

        <div className="flex flex-1 flex-col">
          <div className="">
            <ViewSelector
              view={view}
              onViewChange={handleViewChange}
              designPositions={initialDesigns}
              designs={designs}
              uploadLoading={uploadLoading}
            />

            <DesignCanvas
              canvasRef={canvasRef as any}
              view={view}
              texture={texture}
              onExport={modelExportCallback}
              uploadLoading={uploadLoading}
            />
          </div>
        </div>
      </div>

      <DesignFooter
        variantPrice={productVariant?.price ?? 0}
        designPositions={['front', 'back', 'left sleeve', 'right sleeve'].map(
          pos => {
            const position = initialDesigns?.find(
              p =>
                p.positionType?.positionName.toLowerCase() ===
                pos.toLowerCase(),
            );
            return {
              name: pos,
              price: position?.positionType?.basePrice || 0,
              hasDesigns: Boolean(designs[pos]?.length),
            };
          },
        )}
        quantity={cartQuantity}
        onIncrement={() => setCartQuantity(prev => Math.min(prev + 1, 99))}
        onDecrement={() => setCartQuantity(prev => Math.max(prev - 1, 1))}
        onCreateCartItem={() => {
          try {
            if (onCreateCartItem && designId) {
              onCreateCartItem({
                variables: {
                  createCartItemInput: {
                    designId,
                    quantity: cartQuantity,
                  },
                },
              });
            }
            toast.success(`Product has been added to cart`);
          } catch (error) {
            toast.error(`Failed to add product to cart`);
          }
        }}
        loading={cartLoading}
      />
    </div>
  );
}
