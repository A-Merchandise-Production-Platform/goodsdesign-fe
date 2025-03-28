import React from 'react';
import { Button } from '@/components/ui/button';
import { ShirtIcon as TShirt } from 'lucide-react';

const DesignFooter: React.FC = () => {
  return (
    <div className="fixed bottom-0 z-50 container flex w-[100vw] items-center justify-between bg-transparent p-4 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 bg-gray-100">
          <TShirt className="h-full w-full p-4" />
        </div>
        <div>
          <h3 className="font-semibold">White T-Shirt</h3>
          <p className="text-sm text-gray-500">$25.00</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">1 out of 5 products</span>
        <Button>Add to cart</Button>
      </div>
    </div>
  );
};

export default DesignFooter;
