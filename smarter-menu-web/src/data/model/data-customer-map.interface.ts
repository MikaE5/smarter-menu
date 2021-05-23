import type { Allergen } from './allergen.interface';
import type { Category } from './category.interface';
import type { Classification } from './classification.interface';
import type { MenuItem } from './menu-item.interface';

export interface DataCustomerMap {
  [customer: string]: {
    categories: Promise<Category[]>;
    menuItems: Promise<MenuItem[]>;
    allergens: Promise<Allergen[]>;
    classifications: Promise<Classification[]>;
  };
}
