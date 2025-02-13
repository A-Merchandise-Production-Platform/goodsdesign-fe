interface ProductPayload {
  name: string;
  description: string;
  categoryId: string;
  imageUrl: string;
  model3DUrl: string;
}

export interface CreateProductPayload extends ProductPayload {}

export interface UpdateProductPayload extends ProductPayload {}
