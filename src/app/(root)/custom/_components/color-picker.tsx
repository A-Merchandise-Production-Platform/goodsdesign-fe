'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const SHIRT_COLORS = [
  { name: 'White', path: '/models/shirt/white.png', color: '#ffffff' },
  { name: 'Pink', path: '/models/shirt/pink.png', color: '#ffc0cb' },
  { name: 'Mint', path: '/models/shirt/mint.png', color: '#b2f2bb' },
  { name: 'Black', path: '/models/shirt/black.png', color: '#000000' },
  { name: 'Gray', path: '/models/shirt/gray.png', color: '#808080' },
  { name: 'Navy', path: '/models/shirt/navy.png', color: '#003366' },
];

interface ColorPickerProps {
  showColorDialog: boolean;
  setShowColorDialog: (show: boolean) => void;
  currentTexture: string;
  onColorSelect: (path: string) => void;
}

export function ColorPicker({
  showColorDialog,
  setShowColorDialog,
  currentTexture,
  onColorSelect,
}: ColorPickerProps) {
  return (
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
              onClick={() => {
                onColorSelect(colorOption.path);
                setShowColorDialog(false);
              }}
            >
              <div
                className="h-12 w-12 rounded-full border"
                style={{ backgroundColor: colorOption.color }}
              />
              <span className="text-sm font-medium">{colorOption.name}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
