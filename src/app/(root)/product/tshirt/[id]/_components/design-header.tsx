import { Download, FileBox, Redo2, Save, Undo2 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth.store';
import { Roles } from '@/graphql/generated/graphql';

interface HeaderProps {
  onSave: () => Promise<void>;
  onExport?: () => void;
  onDownload: () => void;
  uploadLoading?: boolean;
}

const DesignHeader: React.FC<HeaderProps> = ({
  onSave,
  onExport,
  onDownload,
  uploadLoading = false,
}) => {
  const { isAuth, user } = useAuthStore();

  return (
    <header className="z-40 flex h-14 items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">T-Shirt</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* <Button variant="ghost" size="icon">
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Redo2 className="h-4 w-4" />
        </Button> */}
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
          <Download className={`h-4 w-4 ${uploadLoading ? 'opacity-50' : ''}`} />
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
                <FileBox className={`h-4 w-4 ${uploadLoading ? 'opacity-50' : ''}`} />
              </Button>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default DesignHeader;
