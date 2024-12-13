interface ProductInStockBase {
  id: string;
  areaId: string;
  quantityInStock: number;
}

// Interface for FinalProductInStock
export interface FinalProductInStock extends ProductInStockBase {
  orderId: string;
  productDesignId: string;
}

// Interface for BlankProductInStock
export interface BlankProductInStock extends ProductInStockBase {
  productVariantId: string;
}
