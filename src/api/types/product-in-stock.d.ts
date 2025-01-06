interface ProductInStockPayloadBase {
  areaId: string;
  quantityInStock: number;
}

// Interface for FinalProductInStock
export interface FinalProductInStockPayload extends ProductInStockPayloadBase {
  orderId: string;
  productDesignId: string;
}

// Interface for BlankProductInStock
export interface BlankProductInStockPayload extends ProductInStockPayloadBase {
  productVariantId: string;
}

export interface CreateFinalProductInStockPayload
  extends FinalProductInStockPayload {}

export interface UpdateFinalProductInStockPayload
  extends FinalProductInStockPayload {}

export interface CreateBlankProductInStockPayload
  extends BlankProductInStockPayload {}

export interface UpdateBlankProductInStockPayload
  extends BlankProductInStockPayload {}
