interface ProductVariancePayload {
  productId: string;
  information: {
    color: string;
    size: string;
    material: string;
    description: string;
  };
  blankPrice: string;
}

export interface CreateProductVariancePayload extends ProductVariancePayload {}

export interface UpdateProductVariancePayload extends ProductVariancePayload {}
