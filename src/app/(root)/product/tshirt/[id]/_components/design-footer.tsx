import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, MinusCircle, PlusCircle, ShirtIcon as TShirt } from 'lucide-react';

interface DesignFooterProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onCreateCartItem: () => void;
  loading?: boolean;
}

const DesignFooter: React.FC<DesignFooterProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  loading,
  onCreateCartItem,
}) => {
  return (
    <div className="fixed bottom-0 z-50 container flex w-[100vw] items-center justify-between bg-transparent p-4 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16">
          <TShirt className="h-full w-full p-4" />
        </div>
        <div>
          <h3 className="font-semibold">T-Shirt</h3>
          <p className="text-sm text-gray-400">$25.00</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={onDecrement}>
              <MinusCircle className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button variant="outline" size="icon" onClick={onIncrement}>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </span>
        <Button disabled={loading} onClick={onCreateCartItem}>
          {loading && <Loader2 className="animate-spin" />}
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default DesignFooter;
