import { Download, FileBox } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth.store';
import { Roles } from '@/graphql/generated/graphql';

interface HeaderProps {
  onExport?: () => void;
  onDownload: () => void;
}

const DesignHeader: React.FC<HeaderProps> = ({ onExport, onDownload }) => {
  const { isAuth, user } = useAuthStore();

  return (
    <header className="z-40 flex h-14 items-center justify-between px-32">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">T-Shirt</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onDownload}
          title="Download asiImage"
        >
          <Download className="h-4 w-4" />
        </Button>
        {isAuth && user?.role !== Roles.Customer && (
          <>
            {onExport && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onExport}
                title="Export as PDF"
              >
                <FileBox className="h-4 w-4" />
              </Button>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default DesignHeader;
