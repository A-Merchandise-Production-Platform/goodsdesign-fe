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
import Image from 'next/image';

import ModelViewer from '@/components/3d-model-viewer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import DesignCanvas from './_components/design-canvas';

function TShirtTemplate({ view }: { view: string }) {
  const printArea = {
    front: { x: 128, y: 128, width: 256, height: 320 },
    back: { x: 128, y: 64, width: 256, height: 384 },
    'left-sleeve': { x: 192, y: 176, width: 128, height: 128 },
    'right-sleeve': { x: 192, y: 176, width: 128, height: 128 },
  };

  const area = printArea[view as keyof typeof printArea];

  const imageMap = {
    front: '/models/oversize_tshirt_variants/front.png',
    back: '/models/oversize_tshirt_variants/back.png',
    'left-sleeve': '/models/oversize_tshirt_variants/left.png',
    'right-sleeve': '/models/oversize_tshirt_variants/right.png',
  };

  return (
    <div className="absolute h-full w-full">
      <div className="relative h-full w-full">
        <Image
          src={imageMap[view as keyof typeof imageMap]}
          alt={`T-shirt ${view} view`}
          fill
          className="object-contain"
          priority
        />
      </div>
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
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
    </div>
  );
}

function handleUploadClick() {
  const input = document.querySelector('#image-upload') as HTMLInputElement;
  input?.click();
}

export default function ProductDesigner() {
  const [view, setView] = React.useState('front');
  const [decalUrl, setDecalUrl] = React.useState('');

  const handleExport = (imageUrl: string) => {
    setDecalUrl(imageUrl);
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

        {/* Main Content */}
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

          <div className="grid h-[32rem] flex-1 grid-cols-2">
            {/* Design Area */}
            <div className="flex w-full">
              {/* T-Shirt Template */}
              <div className="relative mx-auto h-[32rem] w-[32rem]">
                <TShirtTemplate view={view} />
                <DesignCanvas
                  view={view}
                  width={340}
                  height={400}
                  onExport={handleExport}
                />
              </div>
            </div>

            {/* 3D Preview */}
            <div className="h-[32rem] bg-gray-100">
              <ModelViewer modelUrl="/models/t-shirt.glb" decalUrl={decalUrl} />
            </div>
          </div>
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
