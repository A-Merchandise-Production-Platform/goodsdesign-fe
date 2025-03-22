'use client';

import {
  BookMarked,
  ShirtIcon as TShirt,
  Smile,
  Type,
  Upload,
  Wand2,
  Shapes,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ColorPicker } from './color-picker';

interface DesignToolbarProps {
  currentTexture: string;
  showColorDialog: boolean;
  setShowColorDialog: (show: boolean) => void;
  onColorSelect: (path: string) => void;
  onUploadClick: () => void;
  onAddText: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DesignToolbar({
  currentTexture,
  showColorDialog,
  setShowColorDialog,
  onColorSelect,
  onUploadClick,
  onAddText,
  onImageUpload,
}: DesignToolbarProps) {
  return (
    <div className="z-50 w-64 border-r">
      <div className="flex flex-col gap-4 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => setShowColorDialog(true)}
        >
          <TShirt className="h-4 w-4" />
          <span>T-Shirt</span>
        </Button>

        <ColorPicker
          showColorDialog={showColorDialog}
          setShowColorDialog={setShowColorDialog}
          currentTexture={currentTexture}
          onColorSelect={onColorSelect}
        />

        <div className="relative">
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={onUploadClick}
          >
            <Upload className="h-4 w-4" />
            Uploads
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
        </div>

        <Button
          variant="ghost"
          className="justify-start gap-2"
          onClick={onAddText}
        >
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
  );
}