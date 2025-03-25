export function VolumeDiscount() {
  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="mb-2 font-semibold">Volume Discounts Available</h3>
      <ul className="space-y-1 text-sm">
        <li className="flex justify-between">
          <span>5-9 items</span>
          <span className="font-medium">10% off</span>
        </li>
        <li className="flex justify-between">
          <span>10-24 items</span>
          <span className="font-medium">25% off</span>
        </li>
        <li className="flex justify-between">
          <span>25+ items</span>
          <span className="font-medium">55% off</span>
        </li>
      </ul>
      <p className="text-muted-foreground mt-2 text-xs">
        Discount applied automatically at checkout
      </p>
    </div>
  );
}
