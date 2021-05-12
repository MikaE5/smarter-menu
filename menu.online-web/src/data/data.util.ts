import type { Category } from './model/category.interface';
import type { Classification } from './model/classification.interface';
import type { MenuItem } from './model/menu-item.interface';
import categories from './menu-data/categories.json';
import menuItems from './menu-data/menu-items.json';
import classifications from './menu-data/classifications.json';
import allergens from './menu-data/allergens.json';
import type { Allergen } from './model/allergen.interface';
import type { CategoryType } from './model/category-type.enum';

const CATEGORIES: Category[] = categories as Category[];
const MENU_ITEMS: MenuItem[] = menuItems;
const CLASSIFICATIONS: Classification[] = classifications;
const ALLERGENS: Allergen[] = allergens;

export const getCategoriesByType = (type: CategoryType): Category[] =>
  CATEGORIES.filter((cat) => cat.category_type === type);

export const getCategories = (ids: string[]): Category[] => {
  const idSet = new Set(ids);
  return CATEGORIES.filter(({ id }) => idSet.has(id));
};

export const getMenuItemsForCategory = (
  categoryId: string,
  getMenuItemsForSubCategories = false
): MenuItem[] => {
  let categoryIdSet: Set<string> = new Set([categoryId]);
  if (getMenuItemsForSubCategories) {
    const foundCategories = getCategories([categoryId]);
    if (
      foundCategories.length > 0 &&
      foundCategories[0].sub_categories !== undefined
    ) {
      categoryIdSet = new Set([
        ...categoryIdSet,
        ...foundCategories[0].sub_categories,
      ]);
    }
  }

  return MENU_ITEMS.filter(
    (item: MenuItem) =>
      item.categories.findIndex((id) => categoryIdSet.has(id)) !== -1
  );
};

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
