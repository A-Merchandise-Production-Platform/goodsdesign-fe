import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';

interface OrderSummaryProps {
  selectedItemCount: number;
  cartTotal: number;
  onCheckout: () => void;
  isProcessing: boolean;
}

export function OrderSummary({
  selectedItemCount,
  cartTotal,
  onCheckout,
  isProcessing,
}: OrderSummaryProps) {
  return (
    <div className="md:mt-10 lg:col-span-1">
      <Card className="sticky top-4 p-6">
        <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

        <Separator className="my-4" />

        <div className="mb-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Subtotal ({selectedItemCount} items)
            </span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping Cost</span>
            <span>Calculated when finished production</span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="mb-6 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={onCheckout}
          disabled={isProcessing || selectedItemCount === 0}
        >
          {isProcessing ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            'Proceed to Checkout'
          )}
        </Button>
      </Card>
    </div>
  );
}