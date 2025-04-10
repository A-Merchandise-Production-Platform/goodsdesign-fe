interface VolumeDiscountProps {
  discounts: Array<{
    id: string;
    discountPercent: number;
    minQuantity: number;
  }>;
  loading: boolean;
}

export function VolumeDiscount({ discounts, loading }: VolumeDiscountProps) {
  if (loading) {
    return (
      <div className="bg-muted rounded-lg p-4">
        <h3 className="mb-2 font-semibold">Volume Discounts Available</h3>
        <div className="animate-pulse space-y-2">
          <div className="bg-muted-foreground/20 h-4 w-3/4 rounded" />
          <div className="bg-muted-foreground/20 h-4 w-2/3 rounded" />
        </div>
      </div>
    );
  }

  if (!discounts.length) {
    return null;
  }

  const sortedDiscounts = [...discounts].sort(
    (a, b) => a.minQuantity - b.minQuantity,
  );

  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="mb-2 font-semibold">Volume Discounts Available</h3>
      <ul className="space-y-1 text-sm">
        {sortedDiscounts.map((discount, index) => {
          const isLast = index === sortedDiscounts.length - 1;
          const nextMinQuantity = isLast
            ? null
            : sortedDiscounts[index + 1].minQuantity;

          return (
            <li key={discount.id} className="flex justify-between">
              <span>
                {isLast
                  ? `${discount.minQuantity}+ items`
                  : `${discount.minQuantity}-${(nextMinQuantity as number) - 1} items`}
              </span>
              <span className="font-medium">
                {(discount.discountPercent * 100).toFixed(0)}% off
              </span>
            </li>
          );
        })}
      </ul>
      <p className="text-muted-foreground mt-2 text-xs">
        Discount applied automatically at checkout
      </p>
    </div>
  );
}
