'use client';

import { ShirtIcon as TShirt } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <div className="flex items-center justify-between border-t p-4">
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
}
