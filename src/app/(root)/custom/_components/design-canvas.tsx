'use client';

import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import * as THREE from 'three';

interface DesignZoneLimits {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

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

interface DesignCanvasProps {
  view: string;
  currentTexture: string;
  onTextureUpdate: (texture: THREE.CanvasTexture) => void;
  onDesignsChange: (designs: Record<string, DesignObject[]>) => void;
  designs: Record<string, DesignObject[]>;
}

const CANVAS_SIZE = 1280;

export function DesignCanvas({
  view,
  currentTexture,
  onTextureUpdate,
  onDesignsChange,
  designs,
}: DesignCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const textureCache = useRef<Record<string, HTMLImageElement>>({});
  const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingUpdateRef = useRef(false);

  const getDesignZoneLimits = (view: string): DesignZoneLimits => {
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

  const applyClipPathToObject = (obj: fabric.Object, view: string) => {
    if (!fabricCanvasRef.current) return;

    const limits = getDesignZoneLimits(view);
    const clipPath = new fabric.Rect({
      left: limits.minX,
      top: limits.minY,
      width: limits.maxX - limits.minX,
      height: limits.maxY - limits.minY,
      absolutePositioned: true,
    });

    obj.set({ clipPath });
    fabricCanvasRef.current.renderAll();
  };

  const addDesignZoneIndicator = (view: string) => {
    if (!fabricCanvasRef.current) return;

    const existingIndicator = fabricCanvasRef.current
      .getObjects()
      .find(obj => obj.get('data')?.type === 'designZone');
    if (existingIndicator) {
      fabricCanvasRef.current.remove(existingIndicator);
    }

    const limits = getDesignZoneLimits(view);
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

  const loadBackgroundTexture = (texturePath: string) => {
    if (!fabricCanvasRef.current) return;

    if (textureCache.current[texturePath]) {
      setBackgroundImage(textureCache.current[texturePath]);
      return;
    }

    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      textureCache.current[texturePath] = img;
      setBackgroundImage(img);
    };
    img.src = texturePath;
  };

  const setBackgroundImage = (img: HTMLImageElement) => {
    if (!fabricCanvasRef.current) return;

    const fabricImage = new fabric.Image(img);
    const canvasAspect =
      fabricCanvasRef.current.width! / fabricCanvasRef.current.height!;
    const imageAspect = img.width / img.height;

    let scaleX, scaleY;
    if (imageAspect > canvasAspect) {
      scaleX = scaleY = fabricCanvasRef.current.width! / img.width;
    } else {
      scaleX = scaleY = fabricCanvasRef.current.height! / img.height;
    }

    const left = (fabricCanvasRef.current.width! - img.width * scaleX) / 2;
    const top = (fabricCanvasRef.current.height! - img.height * scaleY) / 2;

    fabricImage.set({
      scaleX,
      scaleY,
      left,
      top,
      originX: 'left',
      originY: 'top',
      selectable: false,
      evented: false,
    });

    fabricCanvasRef.current.backgroundImage = fabricImage;
    fabricCanvasRef.current.renderAll();
    debounceTextureUpdate();
  };

  const updateTextureOnModel = () => {
    if (!fabricCanvasRef.current || !tempCanvasRef.current) return;

    const tempCanvas = tempCanvasRef.current;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    tempCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

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

    const allViews = ['front', 'back', 'left-sleeve', 'right-sleeve'];
    const imagePromises: Promise<void>[] = [];
    const loadedImages: Record<string, HTMLImageElement> = {};

    allViews.forEach(viewName => {
      const viewDesigns = designs[viewName] || [];
      viewDesigns.forEach(objData => {
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
              img.onerror = () => resolve();
            }
          });

          imagePromises.push(promise);
        }
      });
    });

    Promise.all(imagePromises).then(() => {
      allViews.forEach(viewName => {
        const viewDesigns = designs[viewName] || [];
        viewDesigns.forEach(objData => {
          const limits = getDesignZoneLimits(objData.view);
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

      const newTexture = new THREE.CanvasTexture(tempCanvas);
      newTexture.flipY = false;
      newTexture.colorSpace = THREE.SRGBColorSpace;
      onTextureUpdate(newTexture);
    });
  };

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
    }, 300);
  };

  const saveCurrentDesign = () => {
    if (!fabricCanvasRef.current) return;

    const objects = fabricCanvasRef.current.getObjects().filter(obj => {
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
        view: obj.get('data')?.view || view,
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

    onDesignsChange({ ...designs, [view]: serializedObjects });
  };

  useEffect(() => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = CANVAS_SIZE;
    tempCanvas.height = CANVAS_SIZE;
    tempCanvasRef.current = tempCanvas;

    return () => {
      tempCanvasRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
    }

    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      selection: true,
      preserveObjectStacking: true,
      interactive: true,
    });

    fabricCanvasRef.current.on('object:modified', debounceTextureUpdate);
    fabricCanvasRef.current.on('object:added', e => {
      const obj = e.target as fabric.Object;
      applyClipPathToObject(obj, view);
      obj.set('data', { ...obj.get('data'), view: view });

      if (isObjectFullyOutside(obj, view)) {
        fabricCanvasRef.current?.remove(obj);
      }

      debounceTextureUpdate();
    });

    fabricCanvasRef.current.on('object:removed', debounceTextureUpdate);
    loadBackgroundTexture(currentTexture);
    addDesignZoneIndicator(view);

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
      }

      if (textureUpdateTimeoutRef.current) {
        clearTimeout(textureUpdateTimeoutRef.current);
      }
    };
  }, [view, currentTexture]);

  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const savedDesign = designs[view];
    if (!savedDesign) return;

    const objects = fabricCanvasRef.current.getObjects();
    objects.forEach(obj => {
      if (obj.get('data')?.type !== 'designZone') {
        fabricCanvasRef.current?.remove(obj);
      }
    });

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
        text.set('data', { view: objData.view || view });
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
          fabricImage.set('data', { view: objData.view || view });
          applyClipPathToObject(fabricImage, view);
          fabricCanvasRef.current?.add(fabricImage);
          fabricCanvasRef.current?.renderAll();
        };
        imgElement.src = objData.src;
      }
    });

    fabricCanvasRef.current.renderAll();
    debounceTextureUpdate();
  }, [designs, view]);

  return (
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
        <div className="bg-muted absolute bottom-0 left-0 h-[11rem] w-[31rem]" />
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
  );
}