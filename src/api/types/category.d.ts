interface CategoryPayload {
  name: string;
  description: string;
  imageUrl: string;
}

export interface CreateCategoryPayload extends CategoryPayload {}

export interface UpdateCategoryPayload extends CategoryPayload {}
