'use client';

import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import {
  Redo2,
  Undo2,
  ShirtIcon as TShirt,
  Upload,
  Type,
  BookMarked,
  Smile,
  Wand2,
  Shapes,
  Save,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FabricCanvas from './_components/fabric-canvas';
import * as fabric from 'fabric';

export default function ProductDesigner() {
  const [view, setView] = React.useState('front');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fabricCanvas, setFabricCanvas] = React.useState<fabric.Canvas | null>(
    null,
  );

const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file && fabricCanvas) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      let imageUrl = e.target?.result as string;
      let imageElement = document.createElement('img');
      imageElement.src = imageUrl;

      // Ensure the image is fully loaded before adding to the canvas
      imageElement.onload = function () {
        const imgInstance = new fabric.Image(imageElement, {
          scaleX: 1,
          scaleY: 1,
          selectable: true,
        });

        const printArea = {
          front: { x: 100, y: 80, width: 140, height: 160 },
          back: { x: 100, y: 80, width: 140, height: 160 },
          'left-sleeve': { x: 40, y: 40, width: 60, height: 60 },
          'right-sleeve': { x: 40, y: 40, width: 60, height: 60 },
        };
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

        fabricCanvas.add(imgInstance);
        fabricCanvas.setActiveObject(imgInstance);
        fabricCanvas.renderAll();
      };
    };
  }
};



  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b px-6">
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
          <Button variant="ghost" size="icon">
            <Save className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <span>3D view</span>
            <Switch />
          </div>
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
        <div className="w-64 border-r">
          <div className="flex flex-col gap-4 p-4">
            <Button variant="ghost" className="justify-start gap-2">
              <TShirt className="h-4 w-4" />
              Product
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
              Uploads
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
            <Button variant="ghost" className="justify-start gap-2">
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

        {/* Resizable Content */}
        <div className="flex flex-1 flex-col">
          {/* View Selector Tabs */}
          <Tabs value={view} onValueChange={setView} className="border-b">
            <TabsList className="w-full justify-start rounded-none">
              <TabsTrigger value="front">Front</TabsTrigger>
              <TabsTrigger value="back">Back</TabsTrigger>
              <TabsTrigger value="left-sleeve">Left sleeve</TabsTrigger>
              <TabsTrigger value="right-sleeve">Right sleeve</TabsTrigger>
            </TabsList>
          </Tabs>

          <ResizablePanelGroup direction="horizontal" className="flex-1">
            {/* Design Area */}
            <ResizablePanel defaultSize={50} minSize={25}>
              <div className="flex h-full flex-col bg-gray-50">
                {/* T-Shirt Template */}
                <div className="flex-1 p-4">
                  <div className="relative flex h-full w-full items-center justify-center">
                    <FabricCanvas
                      width={340}
                      height={400}
                      view={view}
                      onCanvasCreated={setFabricCanvas}
                    />
                  </div>
                </div>
              </div>
            </ResizablePanel>

            {/* Resizable Handle */}
            <ResizableHandle withHandle />

            {/* 3D Preview */}
            <ResizablePanel defaultSize={50} minSize={25}>
              <div className="h-full bg-gray-100">
                <Canvas camera={{ position: [0, 0, 2] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <mesh>
                    <boxGeometry args={[1, 1.2, 0.2]} />
                    <meshStandardMaterial color="white" />
                  </mesh>
                  <OrbitControls enableZoom={false} />
                  <Environment preset="studio" />
                </Canvas>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
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
