import type { CategoryType } from './category-type.enum';

export interface Category {
  id: string;
  name: string;
  category_number?: number;
  category_type: CategoryType;
  sub_categories?: string[];
}
