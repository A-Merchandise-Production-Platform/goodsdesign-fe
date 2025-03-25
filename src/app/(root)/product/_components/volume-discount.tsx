export function VolumeDiscount() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Volume Discounts Available</h3>
      <ul className="text-sm space-y-1">
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
      <p className="text-xs text-muted-foreground mt-2">Discount applied automatically at checkout</p>
    </div>
  )
}

