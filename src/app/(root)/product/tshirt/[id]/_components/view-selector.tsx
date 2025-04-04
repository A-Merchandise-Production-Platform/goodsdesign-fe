import React from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatPrice } from '@/lib/utils';
import { DesignObject } from '@/types/design-object';

interface ViewSelectorProps {
  view: string;
  onViewChange: (view: string) => void;
  designPositions?: Array<{
    positionType?: {
      positionName: string;
      basePrice: number;
    } | null;
  }> | null;
  designs: Record<string, DesignObject[]>;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({
  view,
  onViewChange,
  designPositions,
  designs,
}) => {
  const renderPrice = (positionName: string) => {
    const hasDesigns = designs[positionName.toLowerCase()]?.length > 0;
    if (!hasDesigns) return null;

    const position = designPositions?.find(
      pos =>
        pos.positionType?.positionName.toLowerCase() ===
        positionName.toLowerCase(),
    );
    const price = position?.positionType?.basePrice || 0;

    return (
      <span className="text-muted-foreground text-sm">
        (+{formatPrice(price)})
      </span>
    );
  };

  return (
    <Tabs
      value={view}
      onValueChange={onViewChange}
      className="w-[64rem] border-b"
    >
      <TabsList className="z-40 w-full justify-start rounded-none">
        <TabsTrigger className="text-base" value="front">
          Front
          {renderPrice('front')}
        </TabsTrigger>
        <TabsTrigger className="text-base" value="back">
          Back
          {renderPrice('back')}
        </TabsTrigger>
        <TabsTrigger className="text-base" value="left sleeve">
          Left sleeve
          {renderPrice('left sleeve')}
        </TabsTrigger>
        <TabsTrigger className="text-base" value="right sleeve">
          Right sleeve
          {renderPrice('right sleeve')}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ViewSelector;
