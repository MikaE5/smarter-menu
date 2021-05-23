import type { Category } from './model/category.interface';
import type { Classification } from './model/classification.interface';
import type { MenuItem } from './model/menu-item.interface';
import type { Allergen } from './model/allergen.interface';
import type { CategoryType } from './model/category-type.enum';
import pageConfig from '../page-config.json';
import type { PageConfig } from './model/page-config.interface';

export const getPageConfig = (): PageConfig => {
  return pageConfig;
};

const baseRequest = (endpoint: string, fallback?: any): Promise<any> => {
  return fetch(
    `https://je0vae9q4l.execute-api.eu-central-1.amazonaws.com${endpoint}`,
    {
      method: 'post',
      headers: {
        'x-netlify-host': 'smarter-menu-netlify',
      },
      body: JSON.stringify({
        customer_id: getPageConfig().customer_id,
      }),
    }
  )
    .then((res) => res.json())
    .catch(fallback);
};

let categories: Promise<Category[]> = undefined;
const getCategories = async (): Promise<Category[]> => {
  if (categories === undefined) {
    categories = (await baseRequest('categories', [])).data;
  }

  return categories;
};

let menuItems: Promise<MenuItem[]> = undefined;
const getMenuItems = async (): Promise<MenuItem[]> => {
  if (menuItems === undefined) {
    menuItems = (await baseRequest('items', [])).data;
  }

  return menuItems;
};

let allergens: Promise<Allergen[]> = undefined;
let classifications: Promise<Classification[]> = undefined;
const getMetaData = async () => {
  const metaData = (await baseRequest('items-meta', [])).data;
  allergens = metaData.filter((meta) => meta.id.startsWith('meta/allergen'));
  classifications = metaData.filter((meta) =>
    meta.id.startsWith('meta/classification')
  );
};

const getAllergens = async (): Promise<Allergen[]> => {
  if (allergens === undefined) {
    await getMetaData();
  }
  return allergens;
};

const getClassifications = async (): Promise<Classification[]> => {
  if (classifications === undefined) {
    await getMetaData();
  }
  return classifications;
};

export const getCategoriesByType = async (
  type: CategoryType
): Promise<Category[]> =>
  (await getCategories()).filter((cat) => cat.category_type === type);

export const getCategoriesByIds = async (
  ids: string[]
): Promise<Category[]> => {
  const idSet = new Set(ids);
  return (await getCategories()).filter(({ id }) => idSet.has(id));
};

export const getMenuItemsForCategory = async (
  categoryId: string,
  getMenuItemsForSubCategories = false
): Promise<MenuItem[]> => {
  let categoryIdSet: Set<string> = new Set([categoryId]);
  if (getMenuItemsForSubCategories) {
    const foundCategories = await getCategoriesByIds([categoryId]);
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

  return (await getMenuItems()).filter(
    (item: MenuItem) =>
      item.categories.findIndex((id) => categoryIdSet.has(id)) !== -1
  );
};

export const getMenuItemsByIds = async (ids: string[]): Promise<MenuItem[]> => {
  const idSet = new Set(ids);
  return (await getMenuItems()).filter(({ id }) => idSet.has(id));
};

export const getCategoryNameForId = async (
  categoryId: string
): Promise<string> => {
  const category = (await getCategories()).find(({ id }) => id === categoryId);
  return category !== undefined ? category.name : undefined;
};

export const getClassificationsByIds = async (
  ids: string[]
): Promise<Classification[]> => {
  const classifications = await getClassifications();

  return ids
    .map((id) =>
      classifications.find(
        (classification: Classification) => classification.id === id
      )
    )
    .filter((classification: Classification) => classification !== undefined);
};

export const getAllergensByIds = async (ids: string[]): Promise<Allergen[]> => {
  const allergens = await getAllergens();

  return ids
    .map((id) => allergens.find((allergen: Allergen) => allergen.id === id))
    .filter((allergen: Allergen) => allergen !== undefined);
};
