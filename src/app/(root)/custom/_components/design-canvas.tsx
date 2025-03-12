'use client';

import * as fabric from 'fabric';
import React, { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';

interface DesignCanvasProps {
  view: string;
  width: number;
  height: number;
  onExport: (imageUrl: string) => void;
}

const printArea = {
  front: { x: 41.5, y: 71.5, width: 256, height: 320 },
  back: { x: 41.5, y: 7.5, width: 256, height: 384 },
  'left-sleeve': { x: 105.5, y: 119.5, width: 128, height: 128 },
  'right-sleeve': { x: 105.5, y: 119.5, width: 128, height: 128 },
};

export default function DesignCanvas({
  view,
  width,
  height,
  onExport,
}: DesignCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(undefined);
  const fabricRef = useRef<fabric.Canvas>(undefined);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && fabricRef.current) {
      const reader = new FileReader();
      reader.onload = e => {
        const imgData = e.target?.result as string;
        const imageUrl = imgData;
        const imageElement = new Image();
        imageElement.crossOrigin = 'anonymous';
        imageElement.src = imageUrl;
        imageElement.onload = () => {
          const fabricImage = new fabric.Image(imageElement);
          const area = printArea[view as keyof typeof printArea];

          // Scale image to fit print area while maintaining aspect ratio
          const scale = Math.min(
            area.width / (fabricImage.width ?? 1),
            area.height / (fabricImage.height ?? 1),
          );

          fabricImage.set({
            scaleX: scale,
            scaleY: scale,
            left: area.x + (area.width - (fabricImage.width ?? 0) * scale) / 2,
            top: area.y + (area.height - (fabricImage.height ?? 0) * scale) / 2,
          });

          fabricRef.current?.add(fabricImage);
          fabricRef.current?.setActiveObject(fabricImage);
          fabricRef.current?.renderAll();
        };
      };
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: 'white', // Set white background
      preserveObjectStacking: true,
    });

    const area = printArea[view as keyof typeof printArea];

    // Define clipping area (prevents objects from going outside)
    const clipPath = new fabric.Rect({
      left: area.x,
      top: area.y,
      width: area.width,
      height: area.height,
      absolutePositioned: true,
    });
    fabricRef.current.clipPath = clipPath;

    // Auto-export on any canvas change
    fabricRef.current.on('object:modified', () => exportCanvas());
    fabricRef.current.on('object:added', () => exportCanvas());
    fabricRef.current.on('object:removed', () => exportCanvas());

    // Delete objects when pressing Delete key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' && fabricRef.current) {
        const activeObjects = fabricRef.current.getActiveObjects();
        if (activeObjects.length > 0) {
          activeObjects.forEach(object => {
            fabricRef.current?.remove(object);
          });
          fabricRef.current.discardActiveObject();
          fabricRef.current.renderAll();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = undefined;
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [view, width, height]);

  const exportCanvas = () => {
    if (!fabricRef.current) {
      console.error('Canvas not initialized');
      return;
    }

    try {
      const dataURL = fabricRef.current.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1,
      });

      if (!dataURL || dataURL.length < 10) {
        console.error('Exported image is empty');
        return;
      }

      // Validate data URL format
      if (!dataURL.startsWith('data:image/png;base64,')) {
        console.error(
          'Invalid data URL format:',
          dataURL.substring(0, 30) + '...',
        );
        return;
      }

      // Log successful export
      console.log('Successfully exported canvas image:', {
        size: dataURL.length,
        preview: dataURL.substring(0, 30) + '...',
      });

      onExport(dataURL);
    } catch (error) {
      console.error('Error exporting canvas:', error);
    }
  };

  // Function to add text
  const addText = () => {
    if (!fabricRef.current) return;

    const text = new fabric.Textbox('Your Text', {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: '#000000',
      fontFamily: 'Arial',
      selectable: true,
      hasControls: true,
    });

    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
    fabricRef.current.renderAll();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <canvas ref={canvasRef as any} />

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="image-upload"
      />

      {/* Buttons */}
      <div className="absolute right-4 bottom-4 flex gap-2">
        <Button onClick={addText}>Add Text</Button>
        <Button onClick={exportCanvas}>Export Design</Button>
      </div>
    </div>
  );
}
