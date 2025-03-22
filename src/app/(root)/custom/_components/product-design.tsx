'use client';

import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Header } from './header';
import { Footer } from './footer';
import { ViewSelector } from './view-selector';
import { DesignToolbar } from './design-toolbar';
import { DesignCanvas } from './design-canvas';
import OversizeTshirtModel from './tshirt-model';

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

type SerializedDesign = Record<string, DesignObject[]>;

function handleUploadClick() {
  const input = document.querySelector('#image-upload') as HTMLInputElement;
  input?.click();
}

export default function ProductDesigner() {
  const [view, setView] = useState('front');
  const [currentTexture, setCurrentTexture] = useState<string>('/models/shirt/white.png');
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const [showColorDialog, setShowColorDialog] = useState(false);
  const [designs, setDesigns] = useState<SerializedDesign>({});

  const handleColorSelect = (path: string) => {
    setCurrentTexture(path);
  };

  const handleAddText = () => {
    setDesigns(prev => {
      const newDesigns = { ...prev };
      const viewDesigns = [...(newDesigns[view] || [])];
      viewDesigns.push({
        type: 'textbox',
        text: 'Edit this text',
        left: 200,
        top: 200,
        width: 200,
        height: 50,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        fontSize: 40,
        fill: '#000000',
        fontFamily: 'Arial',
        view,
      });
      newDesigns[view] = viewDesigns;
      return newDesigns;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = event => {
      if (!event.target?.result) return;

      const img = new Image();
      img.onload = () => {
        setDesigns(prev => {
          const newDesigns = { ...prev };
          const viewDesigns = [...(newDesigns[view] || [])];
          viewDesigns.push({
            type: 'image',
            src: event.target!.result as string,
            left: 200,
            top: 200,
            width: img.width,
            height: img.height,
            scaleX: Math.min(1, 200 / img.width),
            scaleY: Math.min(1, 200 / img.height),
            angle: 0,
            view,
          });
          newDesigns[view] = viewDesigns;
          return newDesigns;
        });
      };
      img.src = event.target.result.toString();
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  const handleTextureUpdate = (newTexture: THREE.CanvasTexture) => {
    if (texture) {
      texture.dispose();
    }
    setTexture(newTexture);
  };

  const handleDesignsChange = (newDesigns: SerializedDesign) => {
    setDesigns(newDesigns);
  };

  const handleSave = () => {
    // Save designs to backend or local storage
    console.log('Saving designs:', designs);
  };

  return (
    <div className="flex h-screen flex-col">
      <Header onSave={handleSave} />

      <div className="flex flex-1">
        <DesignToolbar
          currentTexture={currentTexture}
          showColorDialog={showColorDialog}
          setShowColorDialog={setShowColorDialog}
          onColorSelect={handleColorSelect}
          onUploadClick={handleUploadClick}
          onAddText={handleAddText}
          onImageUpload={handleImageUpload}
        />

        <div className="flex flex-1 flex-col">
          <ViewSelector view={view} onViewChange={handleViewChange} />

          <div className="relative flex h-[32rem] w-[64rem] flex-1 gap-4 pt-4">
            <DesignCanvas
              view={view}
              currentTexture={currentTexture}
              designs={designs}
              onTextureUpdate={handleTextureUpdate}
              onDesignsChange={handleDesignsChange}
            />

            <div className="bg-background absolute -top-40 -right-50 z-30 h-[11.1rem] w-[110rem]" />
            <div className="bg-background absolute top-0 right-256 z-20 h-[63rem] w-[68rem]" />
            <div className="bg-background absolute top-4 -right-71 z-20 h-[33rem] w-[50rem]" />
            <div className="bg-background absolute top-132 -left-4 z-20 h-[30rem] w-[70rem]" />

            <div className="relative z-20 h-[32rem] flex-grow">
              <OversizeTshirtModel
                texture={texture}
                view={view}
                color="#FFFFFF"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
