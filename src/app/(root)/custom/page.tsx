'use client';
import {
  BookMarked,
  Redo2,
  Shapes,
  ShirtIcon as TShirt,
  Smile,
  Type,
  Undo2,
  Upload,
  Wand2,
} from 'lucide-react';
import * as React from 'react';

import ModelViewer from '@/components/3d-model-viewer';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import DesignCanvas from './_components/design-canvas';

function TShirtTemplate({ view }: { view: string }) {
  const printArea = {
    front: { x: 100, y: 80, width: 140, height: 160 },
    back: { x: 100, y: 80, width: 140, height: 160 },
    'left-sleeve': { x: 40, y: 40, width: 60, height: 60 },
    'right-sleeve': { x: 40, y: 40, width: 60, height: 60 },
  };

  const area = printArea[view as keyof typeof printArea];

  return (
    <svg viewBox="0 0 340 400" className="absolute h-full w-full">
      {/* Front View */}
      {view === 'front' && (
        <>
          <path
            d="M70,50 C70,50 100,20 170,20 C240,20 270,50 270,50 L320,100 L290,140 L270,120 L270,380 L70,380 L70,120 L50,140 L20,100 L70,50"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          {/* Collar */}
          <path
            d="M140,20 C140,20 170,25 200,20 C180,35 160,35 140,20"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        </>
      )}

      {/* Back View */}
      {view === 'back' && (
        <>
          <path
            d="M70,50 C70,50 100,20 170,20 C240,20 270,50 270,50 L320,100 L290,140 L270,120 L270,380 L70,380 L70,120 L50,140 L20,100 L70,50"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          {/* Back Collar */}
          <path
            d="M140,20 C140,20 170,15 200,20"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        </>
      )}

      {/* Sleeve Views */}
      {(view === 'left-sleeve' || view === 'right-sleeve') && (
        <path
          d="M50,50 L200,50 L180,200 L70,200 Z"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
      )}

      {/* Print Area */}
      <rect
        x={area.x}
        y={area.y}
        width={area.width}
        height={area.height}
        fill="none"
        stroke="#666"
        strokeWidth="2"
        strokeDasharray="5,5"
      />

      {/* Safe Print Area Text */}
      <text
        x={area.x + area.width / 2}
        y={area.y + area.height / 2}
        textAnchor="middle"
        fill="#666"
        fontSize="12"
      >
        Safe Print Area
      </text>
    </svg>
  );
}

function handleUploadClick() {
  const input = document.querySelector('#image-upload') as HTMLInputElement;
  input?.click();
}

export default function ProductDesigner() {
  const [view, setView] = React.useState('front');

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
              onClick={handleUploadClick}
            >
              <Upload className="h-4 w-4" />
              Uploads
            </Button>
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
                <div className="relative h-full w-full">
                  <TShirtTemplate view={view} />
                  <DesignCanvas view={view} width={340} height={400} />
                </div>
              </div>
            </ResizablePanel>

            {/* Resizable Handle */}
            <ResizableHandle withHandle />

            {/* 3D Preview */}
            <ResizablePanel defaultSize={50} minSize={25}>
              <div className="h-full bg-gray-100">
                <ModelViewer
                  modelUrl="/models/t_shirt.glb"
                  decalUrl="/assets/logo.png"
                />
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
