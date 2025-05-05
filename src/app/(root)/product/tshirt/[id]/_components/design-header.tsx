import { Download, FileBox, Redo2, Save, Type, Undo2 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuthStore } from '@/stores/auth.store';
import { Roles } from '@/graphql/generated/graphql';

// Available fonts for text objects
const AVAILABLE_FONTS = [
  { name: 'Arial', value: 'Arial' },
  { name: 'Times New Roman', value: 'Times New Roman' },
  { name: 'Georgia', value: 'Georgia' },
  { name: 'Verdana', value: 'Verdana' },
  { name: 'Courier New', value: 'Courier New' },
  { name: 'Impact', value: 'Impact' },
  { name: 'Comic Sans MS', value: 'Comic Sans MS' },
  { name: 'Trebuchet MS', value: 'Trebuchet MS' },
  { name: 'Tahoma', value: 'Tahoma' },
];

interface HeaderProps {
  onSave: () => Promise<void>;
  onExport?: () => void;
  onDownload: () => void;
  onFontChange?: (fontFamily: string) => void;
  onColorChange?: (color: string) => void;
  uploadLoading?: boolean;
}

const DesignHeader: React.FC<HeaderProps> = ({
  onSave,
  onExport,
  onDownload,
  onFontChange,
  onColorChange,
  uploadLoading = false,
}) => {
  const { isAuth, user } = useAuthStore();

  return (
    <header className="z-40 flex h-14 items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">T-Shirt</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* Font Selection */}
        {onFontChange && (
          <div className="w-[200px]">
            <Select onValueChange={onFontChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_FONTS.map(font => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Color Picker */}
        {onColorChange && (
          <div className="flex items-center gap-2">
            <input
              type="color"
              className="h-8 w-8 cursor-pointer rounded border border-gray-300 p-0"
              onChange={e => onColorChange(e.target.value)}
              title="Select text color"
            />
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            onSave();
          }}
          title="Save current design"
          disabled={uploadLoading}
        >
          <Save className={`h-4 w-4 ${uploadLoading ? 'opacity-50' : ''}`} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDownload}
          title="Download asiImage"
          disabled={uploadLoading}
        >
          <Download
            className={`h-4 w-4 ${uploadLoading ? 'opacity-50' : ''}`}
          />
        </Button>
        {isAuth && user?.role !== Roles.Customer && (
          <>
            {onExport && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onExport}
                title="Export as PDF"
                disabled={uploadLoading}
              >
                <FileBox
                  className={`h-4 w-4 ${uploadLoading ? 'opacity-50' : ''}`}
                />
              </Button>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default DesignHeader;
