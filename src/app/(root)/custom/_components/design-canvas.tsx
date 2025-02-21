import * as fabric from 'fabric';
import React, { useEffect, useRef, useState } from 'react';

interface DesignCanvasProps {
  view: string;
  width: number;
  height: number;
}

const printArea = {
  front: { x: 80, y: 45, width: 180, height: 205 },
  back: { x: 80, y: 45, width: 180, height: 205 },
  'left-sleeve': { x: 40, y: 40, width: 60, height: 60 },
  'right-sleeve': { x: 40, y: 40, width: 60, height: 60 },
};

interface DesignState {
  [key: string]: fabric.Object[];
}

export default function DesignCanvas({
  view,
  width,
  height,
}: DesignCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(undefined);
  const fabricRef = useRef<fabric.Canvas>(undefined);
  const [designs, setDesigns] = useState<DesignState>({
    front: [],
    back: [],
    'left-sleeve': [],
    'right-sleeve': [],
  });

  // Save current canvas state before unmounting or switching views
  const saveCurrentDesign = () => {
    if (fabricRef.current) {
      const objects = fabricRef.current.getObjects();
      setDesigns(previous => ({
        ...previous,
        [view]: objects,
      }));
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // Save current design before reinitializing canvas
    if (fabricRef.current) {
      saveCurrentDesign();
    }

    // Initialize Fabric canvas
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: 'transparent',
      preserveObjectStacking: true,
    });

    // Set clip area based on print area
    const area = printArea[view as keyof typeof printArea];
    const clipPath = new fabric.Rect({
      left: area.x,
      top: area.y,
      width: area.width,
      height: area.height,
      absolutePositioned: true,
    });

    fabricRef.current.clipPath = clipPath;

    // Restore designs for current view
    if (designs[view]) {
      designs[view].forEach(object => {
        fabricRef.current?.add(object);
      });
      fabricRef.current?.renderAll();
    }

    // Add event listener for 'Delete' key
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

    // Clean up function
    return () => {
      saveCurrentDesign();
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = undefined;
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [view, width, height]);

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

          // Save the updated design
          saveCurrentDesign();
        });
      });
    }

    // Reset the input value to allow uploading the same file again
    event.target.value = '';
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <canvas ref={canvasRef as React.RefObject<HTMLCanvasElement>} />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        id="image-upload"
      />
    </div>
  );
}
