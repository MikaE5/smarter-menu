import { BehaviorSubject } from 'rxjs';
import type { Allergen } from '../data/model/allergen.interface';
import type { Category } from '../data/model/category.interface';
import type { Classification } from '../data/model/classification.interface';
import type { MenuItem } from '../data/model/menu-item.interface';

export const dataCustomer$: BehaviorSubject<string> = new BehaviorSubject(
  undefined
);
export const categories$: BehaviorSubject<Category[]> = new BehaviorSubject(
  undefined
);
export const menuItems$: BehaviorSubject<MenuItem[]> = new BehaviorSubject(
  undefined
);
export const allergens$: BehaviorSubject<Allergen[]> = new BehaviorSubject(
  undefined
);
export const classifications$: BehaviorSubject<Classification[]> =
  new BehaviorSubject(undefined);
