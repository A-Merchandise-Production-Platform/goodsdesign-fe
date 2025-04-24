import { Copy, Info, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatPrice } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth.store';
import { Roles } from '@/graphql/generated/graphql';

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
  onDuplicate?: (id: string) => void;
  isLoading?: boolean;
}

export function DesignCard({
  design,
  onDuplicate,
  isLoading,
}: DesignCardProps) {
  const {
    id,
    thumbnailUrl,
    systemConfigVariant,
    designPositions = [],
  } = design;
  const { user } = useAuthStore();
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
    router.push(`/view/tshirt/${id}`);
  };

  return (
    <Card
      className="relative cursor-pointer overflow-hidden pt-2 transition-shadow hover:shadow-lg"
      onClick={handleCardClick}
    >
      <div className="relative aspect-square w-full">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt="Design thumbnail"
            fill
            className="object-contain"
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
      </div>

      <CardContent className="relative">
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

        {user?.role == Roles.Customer && onDuplicate && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-[-45px] right-2"
            disabled={isLoading}
            onClick={e => {
              e.stopPropagation();
              onDuplicate(id);
            }}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
