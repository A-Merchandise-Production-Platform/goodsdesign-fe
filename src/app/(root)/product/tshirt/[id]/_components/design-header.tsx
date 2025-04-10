import { Download, Redo2, Save, Undo2 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

interface HeaderProps {
  onSave: () => Promise<void>;
  onExport?: () => void;
}

const DesignHeader: React.FC<HeaderProps> = ({ onSave, onExport }) => {
  return (
    <header className="z-40 flex h-14 items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">T-Shirt</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Redo2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            onSave();
          }}
          title="Save current design"
        >
          <Save className="h-4 w-4" />
        </Button>
        {onExport && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onExport}
            title="Export as image"
          >
            <Download className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default DesignHeader;
