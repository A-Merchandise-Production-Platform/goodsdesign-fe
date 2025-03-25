import { Category } from './category';

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  imageUrl: string[];
  category: Category;
  isDeleted: boolean;
}
