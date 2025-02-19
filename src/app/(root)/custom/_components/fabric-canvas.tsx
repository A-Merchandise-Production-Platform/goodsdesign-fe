'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

interface FabricCanvasProps {
  width: number;
  height: number;
  view: string;
  onCanvasCreated: (canvas: fabric.Canvas) => void;
}

const FabricCanvas: React.FC<FabricCanvasProps> = ({
  width,
  height,
  view,
  onCanvasCreated,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  // Initialize Fabric.js Canvas once
  useEffect(() => {
    if (!canvasRef.current) return;

    // Dispose of previous canvas if exists
    if (canvas) {
      canvas.dispose();
    }

    // Create new fabric canvas
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width,
      height,
    });

    setCanvas(newCanvas);
    onCanvasCreated(newCanvas);

    return () => {
      newCanvas.dispose();
    };
  }, [width, height, onCanvasCreated]);

  // Update the canvas when `view` changes
  useEffect(() => {
    if (!canvas) return; // Ensure canvas exists before modifying it

    canvas.clear();

    const printArea = {
      front: { x: 100, y: 80, width: 140, height: 160 },
      back: { x: 100, y: 80, width: 140, height: 160 },
      'left-sleeve': { x: 40, y: 40, width: 60, height: 60 },
      'right-sleeve': { x: 40, y: 40, width: 60, height: 60 },
    };

    const area = printArea[view as keyof typeof printArea];

    // Add T-shirt outline
    const outlinePath = new fabric.Path(
      view === 'front' || view === 'back'
        ? 'M70,50 C70,50 100,20 170,20 C240,20 270,50 270,50 L320,100 L290,140 L270,120 L270,380 L70,380 L70,120 L50,140 L20,100 L70,50'
        : 'M50,50 L200,50 L180,200 L70,200 Z',
    );
    outlinePath.set({
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2,
      selectable: false,
    });
    canvas.add(outlinePath);

    // Add collar
    if (view === 'front' || view === 'back') {
      const collarPath = new fabric.Path(
        view === 'front'
          ? 'M140,20 C140,20 170,25 200,20 C180,35 160,35 140,20'
          : 'M140,20 C140,20 170,15 200,20',
      );
      collarPath.set({
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 2,
        selectable: false,
      });
      canvas.add(collarPath);
    }

    // Add print area
    const printAreaRect = new fabric.Rect({
      left: area.x,
      top: area.y,
      width: area.width,
      height: area.height,
      fill: 'transparent',
      stroke: '#666',
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      selectable: false,
    });
    canvas.add(printAreaRect);

    // Add "Safe Print Area" text
    const text = new fabric.Text('Safe Print Area', {
      left: area.x + area.width / 2,
      top: area.y + area.height / 2,
      fontSize: 16,
      fill: '#666',
      originX: 'center',
      originY: 'center',
      selectable: false,
    });
    canvas.add(text);

    canvas.renderAll();
  }, [view, canvas]);

  return <canvas className='border-2 border-gray-500 border-dashed' ref={canvasRef} />;
};

export default FabricCanvas;
