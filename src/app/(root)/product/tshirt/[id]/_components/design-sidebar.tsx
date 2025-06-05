import { ShirtIcon as TShirt, Type, Upload, Sparkles } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DesignObject } from '@/types/design-object';
import { useAuthStore } from '@/stores/auth.store';
import { Roles, useGenerateAndUploadImageMutation } from '@/graphql/generated/graphql';

import { LayersPanel } from './layers-panel';
import { SHIRT_COLORS } from './shirt-colors';
import { PulsatingButton } from '@/components/magicui/pulsating-button';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { uploadImage } from '@/graphql/upload';

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
  onGenAIUpload?: (imageUrl: string) => void;
}

const EXAMPLE_PROMPTS = [
  "A minimalist geometric pattern in pastel colors",
  "Abstract watercolor splashes with vibrant colors",
  "Vintage retro wave design with neon elements",
  "Japanese-inspired cherry blossom pattern",
  "Modern tech circuit board pattern",
  "Tropical palm leaves in monochrome",
  "Abstract marble texture with gold veins",
  "Space-themed galaxy with stars and planets",
  "Geometric mandala with sacred geometry",
  "Abstract brush strokes in primary colors",
  "Minimalist line art of mountains",
  "Vintage comic book style illustration",
  "Abstract splatter paint in rainbow colors",
  "Modern minimalist logo design",
  "Abstract geometric shapes in gradient colors",
  "Vintage postage stamp design",
  "Abstract wave pattern in ocean colors",
  "Minimalist animal silhouette",
  "Abstract dot pattern in pastel colors",
  "Modern typography art piece"
];

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
  onGenAIUpload,
}) => {
  const { user } = useAuthStore();

  const [tempColor, setTempColor] = useState<
    { path: string; color: string } | undefined
  >();
  const [showGenAIDialog, setShowGenAIDialog] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [randomPrompts, setRandomPrompts] = useState<string[]>([]);

  const [generateAndUploadImage, { loading: generateAndUploadImageLoading }] = useGenerateAndUploadImageMutation();
  // generateAndUploadImage({
  //   variables: {
  //     prompt: prompt,
  //   },
  // });

  useEffect(() => {
    // Get 3 random prompts when dialog opens
    if (showGenAIDialog) {
      const shuffled = [...EXAMPLE_PROMPTS].sort(() => 0.5 - Math.random());
      setRandomPrompts(shuffled.slice(0, 3));
    }
  }, [showGenAIDialog]);

  const handleUploadClick = () => {
    const input = document.querySelector('#image-upload') as HTMLInputElement;
    input?.click();
  };

  const handleGenAI = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateAndUploadImage({
        variables: {
          prompt: prompt,
        },
      });

      if (!result.data?.generateAndUploadImage?.url) {
        throw new Error('Failed to generate image');
      }

      // Pass the image URL to the parent component for handling
      if (onGenAIUpload) {
        onGenAIUpload(result.data.generateAndUploadImage.url);
      }

      setShowGenAIDialog(false);
      setPrompt('');
      toast.success('Image generated successfully');
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
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

        <ShimmerButton className="shadow-2xl mt-4"
          onClick={() => setShowGenAIDialog(true)}
          disabled={uploadLoading}
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          <div className="flex w-full items-center gap-2">
            <Sparkles className="size-4" />
            <div>Gen AI</div>
          </div>  
        </span>
      </ShimmerButton>

        <Dialog open={showGenAIDialog} onOpenChange={setShowGenAIDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Generate Image with AI</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Enter your prompt</label>
                <Input
                  placeholder="Describe what you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Try these examples</label>
                <div className="grid gap-2">
                  {randomPrompts.map((examplePrompt, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(examplePrompt)}
                      className="text-left p-2 rounded-md hover:bg-accent transition-colors text-sm text-muted-foreground hover:text-foreground"
                    >
                      {examplePrompt}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenAI}
                className="w-full"
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Generating...
                  </div>
                ) : (
                  'Generate Image'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* <LayersPanel
          disabled={uploadLoading}
          designs={designs}
          onReorder={onReorderLayers}
        /> */}
      </div>
    </div>
  );
};

export default DesignSidebar;
