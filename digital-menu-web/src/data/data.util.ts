import type { Category } from '../components/model/category.interface';
import categories from './categories.json';

export const getCategories = (): Category[] => categories;
