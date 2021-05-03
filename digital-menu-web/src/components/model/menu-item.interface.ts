export interface MenuItem {
  id: string;
  name: string;
  categories: string[];
  price: {
    amount: number;
    unit: string;
  };
  image: string;
}
