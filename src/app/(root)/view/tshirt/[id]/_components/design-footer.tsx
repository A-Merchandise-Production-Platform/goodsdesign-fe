import {
  Info,
  Loader2,
  MinusCircle,
  PlusCircle,
  ShirtIcon as TShirt,
} from 'lucide-react';
import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatPrice } from '@/lib/utils';

interface Position {
  name: string;
  price: number;
  hasDesigns: boolean;
}

interface DesignFooterProps {
  variantPrice?: number;
  designPositions: Position[];
}

const DesignFooter: React.FC<DesignFooterProps> = ({
  variantPrice = 0,
  designPositions,
}) => {
  const activePositions = designPositions.filter(pos => pos.hasDesigns);
  const designsPositionsPrice = activePositions.reduce(
    (total, pos) => total + pos.price,
    0,
  );
  const totalPrice = variantPrice + designsPositionsPrice;

  return (
    <div className="fixed bottom-0 z-50 container flex w-[100vw] items-center justify-between bg-transparent p-4 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16">
          <TShirt className="h-full w-full p-4" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">T-Shirt</h3>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">{formatPrice(totalPrice)}</span>
            {activePositions.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="hover:text-primary">
                    <Info className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] space-y-2" align="start">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Base Price:</span>
                      <span className="text-muted-foreground">
                        {formatPrice(variantPrice)}
                      </span>
                    </div>
                    {activePositions.map(pos => (
                      <div
                        key={pos.name}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm capitalize">{pos.name}:</span>
                        <span className="text-muted-foreground">
                          +{formatPrice(pos.price)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t pt-2">
                      <div className="flex items-center justify-between font-medium">
                        <span className="text-sm">Total:</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignFooter;
