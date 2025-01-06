export interface ProductVariance {
  id: string;
  productId: string;
  information: {
    color: string;
    size: string;
    material: string;
    description: string;
  };
  blankPrice: string;
  isDeleted: boolean;
}
