import { Download } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

interface HeaderProps {
  onExport?: () => void;
  onThumbnail?: () => void;
}

const DesignHeader: React.FC<HeaderProps> = ({ onExport, onThumbnail }) => {
  return (
    <header className="z-40 flex h-14 items-center justify-between px-32">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">T-Shirt</h1>
      </div>
      <div className="flex items-center gap-4">
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
