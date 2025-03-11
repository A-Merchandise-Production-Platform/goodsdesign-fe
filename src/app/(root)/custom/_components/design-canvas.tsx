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

  useEffect(() => {
    if (!canvasRef.current) return;

    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: 'transparent',
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

  // Function to upload image
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && fabricRef.current) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', event => {
        let imageUrl = event.target?.result as string;
        let imageElement = document.createElement('img');
        imageElement.src = imageUrl;

        // Ensure the image is fully loaded before adding to the canvas
        imageElement.addEventListener('load', function () {
          const imgInstance = new fabric.Image(imageElement, {
            scaleX: 1,
            scaleY: 1,
            selectable: true,
            hasControls: true,
          });

          const area = printArea[view as keyof typeof printArea];

          // Scale and position the image inside the print area
          const scaleFactor = Math.min(
            area.width / imgInstance.width!,
            area.height / imgInstance.height!,
          );
          imgInstance.scale(scaleFactor);
          imgInstance.set({
            left: area.x + (area.width - imgInstance.width! * scaleFactor) / 2,
            top: area.y + (area.height - imgInstance.height! * scaleFactor) / 2,
          });

          fabricRef.current?.add(imgInstance);
          fabricRef.current?.setActiveObject(imgInstance);
          fabricRef.current?.renderAll();
        });
      });
    }

    // Reset the input value to allow uploading the same file again
    event.target.value = '';
  };

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
        onChange={handleFileUpload}
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
