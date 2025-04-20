import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function EmptyCart() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>
      <Card className="p-8 text-center">
        <ShoppingCart className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Looks like you haven&apos;t added any items to your cart yet.
        </p>
        <Button>Continue Shopping</Button>
      </Card>
    </div>
  );
}
