import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  BookMarked,
  ShirtIcon as TShirt,
  Smile,
  Type,
  Upload,
  Wand2,
  Shapes,
} from 'lucide-react';
import { SHIRT_COLORS } from './shirt-colors';

interface DesignSidebarProps {
  showColorDialog: boolean;
  setShowColorDialog: (show: boolean) => void;
  currentTexture: string;
  onColorChange: (texturePath: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddText: () => void;
}

const DesignSidebar: React.FC<DesignSidebarProps> = ({
  showColorDialog,
  setShowColorDialog,
  currentTexture,
  onColorChange,
  onImageUpload,
  onAddText,
}) => {
  const handleUploadClick = () => {
    const input = document.querySelector('#image-upload') as HTMLInputElement;
    input?.click();
  };

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

        <Dialog open={showColorDialog} onOpenChange={setShowColorDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose T-Shirt Color</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4 py-4">
              {SHIRT_COLORS.map(colorOption => (
                <button
                  key={colorOption.name}
                  className={`hover:bg-accent flex flex-col items-center gap-2 rounded-lg border p-3 ${
                    currentTexture === colorOption.path
                      ? 'border-primary'
                      : 'border-border'
                  }`}
                  onClick={() => onColorChange(colorOption.path)}
                >
                  <div
                    className="h-12 w-12 rounded-full border"
                    style={{ backgroundColor: colorOption.color }}
                  />
                  <span className="text-sm font-medium">
                    {colorOption.name}
                  </span>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="relative">
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={handleUploadClick}
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
};

export default DesignSidebar;