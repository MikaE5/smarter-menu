import type { Category } from './model/category.interface';
import type { Classification } from './model/classification.interface';
import type { MenuItem } from './model/menu-item.interface';
import type { Allergen } from './model/allergen.interface';
import type { CategoryType } from './model/category-type.enum';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { sortByKeys } from '../util/array.util';
import {
  allergens$,
  categories$,
  classifications$,
  dataCustomer$,
  menuItems$,
} from '../stores/data.stores';

let dataCustomer: string;

export const setDataCustomer = (customer: string) => {
  // reset data to allow refetch for different customer
  categories$.next(undefined);
  menuItems$.next(undefined);
  allergens$.next(undefined);
  allergens$.next(undefined);
  classifications$.next(undefined);

  dataCustomer = customer;
  dataCustomer$.next(dataCustomer);
};

export const removeDataCustomer = () => {
  setDataCustomer(undefined);
};

const baseRequest = async (endpoint: string, fallback?: any): Promise<any> => {
  const customer: string = await lastValueFrom(
    dataCustomer$.pipe(
      filter((c) => c !== undefined),
      take(1)
    )
  );

  return fetch(
    `https://gaqyjbmgml.execute-api.eu-central-1.amazonaws.com/${endpoint}`,
    {
      method: 'post',
      headers: {
        'x-netlify-host': 'smarter-menu-netlify',
      },
      body: JSON.stringify({
        customer_id: customer,
      }),
    }
  )
    .then((res) => res.json())
    .catch(fallback);
};

const getCategories = async (): Promise<Category[]> => {
  if (categories$.getValue() === undefined) {
    categories$.next(
      sortByKeys((await baseRequest('categories', [])).data, [
        'name',
      ]) as Category[]
    );
  }

  return categories$.getValue();
};

const getMenuItems = async (): Promise<MenuItem[]> => {
  if (menuItems$.getValue() === undefined) {
    menuItems$.next(
      sortByKeys((await baseRequest('items', [])).data, [
        'item_number',
        'name',
      ]) as MenuItem[]
    );
  }
  return menuItems$.getValue();
};

const getMetaData = async () => {
  const metaData = (await baseRequest('items-meta', [])).data;
  allergens$.next(
    metaData.filter((meta) => meta.id.startsWith('meta/allergen'))
  );
  classifications$.next(
    metaData.filter((meta) => meta.id.startsWith('meta/classification'))
  );
};

const getAllergens = async (): Promise<Allergen[]> => {
  if (allergens$.getValue() === undefined) {
    await getMetaData();
  }
  return allergens$.getValue();
};

const getClassifications = async (): Promise<Classification[]> => {
  if (classifications$.getValue() === undefined) {
    await getMetaData();
  }
  return classifications$.getValue();
};

export const getCategoriesByType = async (
  type: CategoryType
): Promise<Category[]> => {
  return (await getCategories()).filter((cat) => cat.category_type === type);
};

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
  let categories: string[] = [categoryId];
  if (getMenuItemsForSubCategories) {
    const foundCategories = await getCategoriesByIds([categoryId]);
    if (
      foundCategories.length > 0 &&
      foundCategories[0].sub_categories !== undefined
    ) {
      categories = categories.concat(foundCategories[0].sub_categories);
    }
  }
  const itemMap: { [categoryId: string]: MenuItem[] } = {};
  const menuItems: MenuItem[] = await getMenuItems();
  const categoryIdSet: Set<string> = new Set(categories);
  menuItems.forEach((item: MenuItem) => {
    const id = item.categories.find((id) => categoryIdSet.has(id));
    if (id === undefined) return;

    if (itemMap[id] === undefined) {
      itemMap[id] = [item];
    } else {
      itemMap[id].push(item);
    }
  });

  return categories.reduce((allItems, id) => {
    const items = itemMap[id];
    if (items !== undefined) {
      return allItems.concat(items);
    }
    return allItems;
  }, []);
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
