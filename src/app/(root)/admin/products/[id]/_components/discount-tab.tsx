'use client';

import { PackageOpen, PercentIcon, TicketIcon } from 'lucide-react';
import { useParams } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useGetAllDiscountByProductIdQuery } from '@/graphql/generated/graphql';

import { CreateDiscountDialog } from './create-discount-dialog';
import { DeleteDiscountDialog } from './delete-discount-dialog';
import { UpdateDiscountDialog } from './update-discount-dialog';

export default function DiscountTab() {
  const { id: productId } = useParams<{ id: string }>();

  const { data, loading, refetch } = useGetAllDiscountByProductIdQuery({
    variables: {
      productId: productId,
    },
  });

  // Determine if there are any discounts
  const hasDiscounts =
    data?.getAllDiscountByProductId &&
    data.getAllDiscountByProductId.length > 0;

  // Sort discounts by minimum quantity
  const sortedDiscounts = hasDiscounts
    ? [...data.getAllDiscountByProductId].sort(
        (a, b) => a.minQuantity - b.minQuantity,
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quantity-Based Discounts</h2>
          <p className="text-muted-foreground">
            Define discounts based on purchase quantity
          </p>
        </div>
        <CreateDiscountDialog productId={productId} />
      </div>

      {/* Discount Grid */}
      <div className="relative">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-2">
              <svg
                className="text-primary h-8 w-8 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-muted-foreground text-sm">
                Loading discounts...
              </span>
            </div>
          </div>
        ) : hasDiscounts ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {sortedDiscounts.map(discount => (
              <Card key={discount.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{discount.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        Buy {discount.minQuantity}+ items
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <UpdateDiscountDialog discount={discount} />
                      <DeleteDiscountDialog discount={discount} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 text-lg font-semibold"
                    >
                      {discount.discountPercent * 100}% OFF
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <PackageOpen className="h-3 w-3" />
                      Min. Quantity: {discount.minQuantity}
                    </Badge>
                    {discount.isActive ? (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 hover:bg-green-100"
                      >
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-muted-foreground"
                      >
                        Inactive
                      </Badge>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-lg border py-12">
            <div className="flex max-w-sm flex-col items-center gap-2 text-center">
              <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
                <TicketIcon className="text-muted-foreground h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">No Discounts</h3>
              <p className="text-muted-foreground text-sm">
                You haven't added any quantity-based discounts for this product
                yet. Create your first discount to encourage bulk purchases.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
