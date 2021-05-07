import type { Category } from './model/category.interface';
import type { Classification } from './model/classification.interface';
import type { MenuItem } from './model/menu-item.interface';
import categories from './categories.json';
import menuItems from './menu-items.json';
import classifications from './classifications.json';
import allergens from './allergens.json';
import type { Allergen } from './model/allergen.interface';

const CATEGORIES: Category[] = categories;
const MENU_ITEMS: MenuItem[] = menuItems;
const CLASSIFICATIONS: Classification[] = classifications;
const ALLERGENS: Allergen[] = allergens;

export const getCategories = (): Category[] => CATEGORIES;

export const getMenuItemsForCategory = (categoryId: string): MenuItem[] =>
  MENU_ITEMS.filter((item: MenuItem) => item.categories.includes(categoryId));

export const getMenuItems = (ids: string[]): MenuItem[] => {
  const idSet = new Set(ids);
  return MENU_ITEMS.filter(({ id }) => idSet.has(id));
};

export const getCategoryNameForId = (categoryId: string): string => {
  const category = CATEGORIES.find(({ id }) => id === categoryId);
  return category !== undefined ? category.name : undefined;
};

export const getClassifications = (ids: string[]): Classification[] => {
  return ids
    .map((id) =>
      CLASSIFICATIONS.find(
        (classification: Classification) => classification.id === id
      )
    )
    .filter((classification: Classification) => classification !== undefined);
};

export const getAllergens = (ids: string[]) => {
  return ids
    .map((id) => ALLERGENS.find((allergen: Allergen) => allergen.id === id))
    .filter((allergen: Allergen) => allergen !== undefined);
};
