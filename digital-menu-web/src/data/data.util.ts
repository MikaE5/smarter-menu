import type { Category } from '../components/model/category.interface';
import type { MenuItem } from '../components/model/menu-item.interface';
import categories from './categories.json';
import menuItems from './menu-items.json';

export const getCategories = (): Category[] => categories;

export const getMenuItemsForCategory = (categoryId: string): MenuItem[] =>
  menuItems.filter((item: MenuItem) => item.categories.includes(categoryId));

export const getMenuItems = (ids: string[]): MenuItem[] => {
  const idSet = new Set(ids);
  return menuItems.filter(({ id }) => idSet.has(id));
};

export const getCategoryNameForId = (categoryId: string): string => {
  const category = categories.find(({ id }) => id === categoryId);
  return category !== undefined ? category.name : undefined;
};
