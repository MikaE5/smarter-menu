import type { Category } from '../components/model/category.interface';
import type { MenuItem } from '../components/model/menu-item.interface';
import categories from './categories.json';
import menuItems from './menu-items.json';

export const getCategories = (): Category[] => categories;

export const getMenuItemsForCategory = (categoryId: string): MenuItem[] =>
  menuItems.filter((item: MenuItem) => item.categories.includes(categoryId));
