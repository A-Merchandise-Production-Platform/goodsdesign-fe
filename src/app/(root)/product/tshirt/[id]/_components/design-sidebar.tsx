import { ShirtIcon as TShirt, Type, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DesignObject } from '@/types/design-object';

import { LayersPanel } from './layers-panel';
import { SHIRT_COLORS } from './shirt-colors';
import { useAuthStore } from '@/stores/auth.store';
import { Roles } from '@/graphql/generated/graphql';

interface DesignSidebarProps {
  showColorDialog: boolean;
  setShowColorDialog: (show: boolean) => void;
  currentTexture: string;
  onColorChange: (texturePath: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddText: () => void;
  designs: DesignObject[];
  onReorderLayers: (startIndex: number, endIndex: number) => void;
  productInfo?: {
    variants?: Array<{
      id: string;
      size?: string | null;
      color?: string | null;
    }> | null;
  };
  selectedSize?: string;
  selectedColor?: string;
  onSizeChange: (size: string) => void;
  getVariant: (
    size: string,
    color: string,
  ) =>
    | {
        id: string;
        price: number;
        color: string;
        size: string;
        model: string;
      }
    | undefined;
  onUpdateVariant?: (options: {
    variables: {
      updateProductDesignId: string;
      input: {
        systemConfigVariantId: string;
        isFinalized: boolean;
        isPublic: boolean;
        isTemplate: boolean;
      };
    };
  }) => void;
  designId?: string;
  uploadLoading?: boolean;
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
  productInfo,
  selectedSize,
  selectedColor,
  onSizeChange,
  getVariant,
  onUpdateVariant,
  designId,
  uploadLoading,
}) => {
  const { user } = useAuthStore();

  const [tempColor, setTempColor] = useState<
    { path: string; color: string } | undefined
  >();
  const handleUploadClick = () => {
    const input = document.querySelector('#image-upload') as HTMLInputElement;
    input?.click();
  };

  return (
    <div className="z-40 w-[200px] p-4">
      <div className="bg-background space-y-1 rounded-xl">
        <Button
          onClick={() => setShowColorDialog(true)}
          className="text-muted-foreground hover:bg-primary/5 dark:hover:bg-muted bg-background block w-full cursor-pointer rounded-md px-3 py-2 text-sm"
          disabled={uploadLoading}
        >
          <div className="flex w-full items-center gap-2">
            <TShirt className="size-4" />
            <div>Product</div>
          </div>
        </Button>

        <Dialog open={showColorDialog} onOpenChange={setShowColorDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Product Options</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Size Selection */}
              <div className="space-y-4">
                <h3 className="font-medium">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {productInfo?.variants
                    ? Array.from(
                        new Set(
                          productInfo.variants
                            .map((v: { size?: string | null }) => v.size)
                            .filter(
                              (
                                size: string | null | undefined,
                              ): size is string => Boolean(size),
                            ),
                        ),
                      ).map((size: string) => (
                        <button
                          key={size}
                          onClick={() => onSizeChange(size)}
                          className={`flex h-10 items-center justify-center rounded-md border px-3 ${
                            selectedSize === size
                              ? 'border-primary text-primary'
                              : 'border-muted text-muted-foreground hover:bg-primary/5'
                          }`}
                        >
                          {size}
                        </button>
                      ))
                    : null}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-4">
                <h3 className="font-medium">Color</h3>
                <div className="grid grid-cols-3 gap-4">
                  {SHIRT_COLORS.map(colorOption => (
                    <button
                      key={colorOption.name}
                      className={`hover:bg-accent flex flex-col items-center gap-2 rounded-lg border p-3 ${
                        tempColor?.path === colorOption.path
                          ? 'border-primary'
                          : 'border-border'
                      }`}
                      onClick={() =>
                        setTempColor({
                          path: colorOption.path,
                          color: colorOption.color,
                        })
                      }
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
              </div>

              {/* Update Button */}
              <Button
                className="mt-6 w-full"
                onClick={() => {
                  if (!tempColor || !selectedSize) {
                    toast.error('Please select both size and color');
                    return;
                  }

                  const variant = getVariant(selectedSize, tempColor.color);
                  if (!variant?.id) {
                    toast.error('Selected combination is not available');
                    return;
                  }

                  if (designId && onUpdateVariant) {
                    try {
                      onUpdateVariant({
                        variables: {
                          updateProductDesignId: designId,
                          input: {
                            systemConfigVariantId: variant.id,
                            isFinalized: false,
                            isPublic: false,
                            isTemplate:
                              user?.role === Roles.Admin ? true : false,
                          },
                        },
                      });
                      onColorChange(tempColor.path);
                      setTempColor(undefined);
                      setShowColorDialog(false);
                      toast.success('Product options updated successfully');
                    } catch (error) {
                      toast.error('Failed to update product options');
                    }
                    onColorChange(tempColor.path);
                    setShowColorDialog(false);
                    setTempColor(undefined);
                  }
                }}
                disabled={!selectedSize || !tempColor}
              >
                Update Product Options
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="relative w-full">
          <Button
            onClick={handleUploadClick}
            className="text-muted-foreground hover:bg-primary/5 dark:hover:bg-muted bg-background block w-full cursor-pointer rounded-md px-3 py-2 text-sm"
            disabled={uploadLoading}
          >
            <div className="flex w-full items-center gap-2">
              <Upload className="size-4" />
              <div>Uploads</div>
            </div>
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
          onClick={onAddText}
          className="text-muted-foreground hover:bg-primary/5 dark:hover:bg-muted bg-background block w-full cursor-pointer rounded-md px-3 py-2 text-sm"
          disabled={uploadLoading}
        >
          <div className="flex w-full items-center gap-2">
            <Type className="size-4" />
            <div>Text</div>
          </div>
        </Button>

        <LayersPanel
          disabled={uploadLoading}
          designs={designs}
          onReorder={onReorderLayers}
        />
      </div>
    </div>
  );
};

export default DesignSidebar;
