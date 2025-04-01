import { ShirtIcon as TShirt, Type, Upload } from 'lucide-react';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DesignObject } from '@/types/design-object';

import { LayersPanel } from './layers-panel';
import { SHIRT_COLORS } from './shirt-colors';

interface DesignSidebarProps {
  showColorDialog: boolean;
  setShowColorDialog: (show: boolean) => void;
  currentTexture: string;
  onColorChange: (texturePath: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddText: () => void;
  designs: DesignObject[];
  onReorderLayers: (startIndex: number, endIndex: number) => void;
}

const DesignSidebar: React.FC<DesignSidebarProps> = ({
  showColorDialog,
  setShowColorDialog,
  currentTexture,
  onColorChange,
  onImageUpload,
  onAddText,
  designs,
  onReorderLayers,
}) => {
  const handleUploadClick = () => {
    const input = document.querySelector('#image-upload') as HTMLInputElement;
    input?.click();
  };

  return (
    <div className="z-40 w-[200px] p-4">
      <div className="bg-background space-y-1 rounded-xl">
        <button
          onClick={() => setShowColorDialog(true)}
          className="text-muted-foreground hover:bg-primary/5 dark:hover:bg-muted block w-full cursor-pointer rounded-md px-3 py-2 text-sm"
        >
          <div className="flex w-full items-center gap-2">
            <TShirt className="size-4" />
            <div>Product</div>
          </div>
        </button>

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

        <div className="relative w-full">
          <button
            onClick={handleUploadClick}
            className="text-muted-foreground hover:bg-primary/5 dark:hover:bg-muted block w-full cursor-pointer rounded-md px-3 py-2 text-sm"
          >
            <div className="flex w-full items-center gap-2">
              <Upload className="size-4" />
              <div>Uploads</div>
            </div>
          </button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
        </div>

        <button
          onClick={onAddText}
          className="text-muted-foreground hover:bg-primary/5 dark:hover:bg-muted block w-full cursor-pointer rounded-md px-3 py-2 text-sm"
        >
          <div className="flex w-full items-center gap-2">
            <Type className="size-4" />
            <div>Text</div>
          </div>
        </button>

        <LayersPanel designs={designs} onReorder={onReorderLayers} />
      </div>
    </div>
  );
};

export default DesignSidebar;
