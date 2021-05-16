export interface MenuItem {
  id: string;
  name: string;
  item_number: number;
  description?: string;
  categories: string[];
  price: {
    amount: number;
    unit: string;
  };
  image?: string;
  classifications?: string[];
  allergens?: string[];
}
