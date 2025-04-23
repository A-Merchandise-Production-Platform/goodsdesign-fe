import { Copy, Eye, Info, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { formatPrice } from '@/lib/utils';

import type { Maybe, ProductDesignEntity } from '@/graphql/generated/graphql';

// Only include the fields we use
type ProductDesign = {
  __typename?: 'ProductDesignEntity';
  id: string;
  isPublic: boolean;
  isTemplate: boolean;
  isFinalized: boolean;
  thumbnailUrl?: string | null;
  designPositions?: Array<{
    __typename?: 'DesignPositionEntity';
    designJSON?: any | null;
    positionType?: {
      __typename?: 'ProductPositionTypeEntity';
      id: string;
      positionName: string;
      basePrice: number;
    } | null;
  }> | null;
  systemConfigVariant?: {
    __typename?: 'SystemConfigVariantEntity';
    id: string;
    price?: number | null;
    color?: string | null;
    size?: string | null;
    model?: string | null;
    product: {
      __typename?: 'ProductEntity';
      name: string;
      category?: {
        __typename?: 'CategoryEntity';
        name: string;
      } | null;
    };
  } | null;
};

interface DesignCardProps {
  design: ProductDesign;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onTogglePublic?: (
    id: string,
    currentState: boolean,
    isFinalized: boolean,
  ) => void;
}

export function DesignCard({
  design,
  onDelete,
  onDuplicate,
  onTogglePublic,
}: DesignCardProps) {
  const {
    id,
    thumbnailUrl,
    systemConfigVariant,
    designPositions = [],
    isPublic = false,
    isFinalized = false,
  } = design;
  const router = useRouter();

  const calculateTotalPrice = () => {
    const variantPrice = systemConfigVariant?.price ?? 0;
    const positionsPrice = (designPositions || []).reduce((total, pos) => {
      const hasDesign = Boolean(pos?.designJSON?.length);
      const positionPrice = pos?.positionType?.basePrice ?? 0;
      return hasDesign ? total + positionPrice : total;
    }, 0);
    return variantPrice + positionsPrice;
  };

  const handleCardClick = () => {
    const path = isFinalized ? 'view' : 'product';
    router.push(`/${path}/tshirt/${id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    const path = isFinalized ? 'view' : 'product';
    router.push(`/${path}/tshirt/${id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(id);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDuplicate?.(id);
  };

  const handleTogglePublic = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTogglePublic?.(id, isPublic, isFinalized);
  };

  return (
    <Card
      className="relative cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
      onClick={handleCardClick}
    >
      <div className="relative aspect-square w-full">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt="Design thumbnail"
            fill
            className="object-contain p-2"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">No thumbnail</p>
          </div>
        )}

        {/* Position badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {designPositions?.map(position =>
            position.designJSON.length > 0 && position.positionType ? (
              <Badge
                key={position.positionType.id}
                variant="secondary"
                className="backdrop-blur-sm"
              >
                {position.positionType.positionName}
              </Badge>
            ) : null,
          )}
        </div>

        {/* Action dropdown */}
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
              <button className="hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                {isFinalized ? (
                  <>
                    <Eye className="mr-4 h-4 w-4" />
                    View
                  </>
                ) : (
                  <>
                    <Pencil className="mr-4 h-4 w-4" />
                    Edit
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="mr-4 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center"
                onClick={handleTogglePublic}
              >
                <Switch checked={isPublic} onCheckedChange={() => {}} />
                <span>Public</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="text-destructive focus:text-destructive mr-4 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {systemConfigVariant?.color && (
              <div
                className="h-5 w-5 rounded-full border"
                style={{
                  backgroundColor: systemConfigVariant.color,
                }}
                title={systemConfigVariant.color}
              />
            )}
            {isPublic ? (
              <Badge
                variant="outline"
                className="border-green-200 bg-green-50 text-green-700"
              >
                Public
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-gray-200 bg-gray-50 text-gray-700"
              >
                Private
              </Badge>
            )}
            {isFinalized && (
              <Badge
                variant="outline"
                className="border-blue-200 bg-blue-50 text-blue-700"
              >
                Ordered
              </Badge>
            )}
          </div>

          {systemConfigVariant && (
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild onClick={e => e.stopPropagation()}>
                  <button className="hover:text-primary">
                    <Info className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-64"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Base Price:</span>
                      <span>{formatPrice(systemConfigVariant.price || 0)}</span>
                    </div>
                    {designPositions?.map(position =>
                      position.designJSON.length > 0 &&
                      position.positionType ? (
                        <div
                          key={position.positionType.id}
                          className="flex justify-between"
                        >
                          <span>{position.positionType.positionName}:</span>
                          <span>
                            +{formatPrice(position.positionType.basePrice)}
                          </span>
                        </div>
                      ) : null,
                    )}
                    <div className="mt-2 flex justify-between border-t pt-2 font-bold">
                      <span>Total:</span>
                      <span>{formatPrice(calculateTotalPrice())}</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <p className="text-lg font-medium">
                {formatPrice(calculateTotalPrice())}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
