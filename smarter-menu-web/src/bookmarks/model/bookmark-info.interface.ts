import type { MenuItem } from '../../data/model/menu-item.interface';

export interface BookmarkPriceInfo {
  price: number;
  unit: string;
}

export interface BookmarkItem {
  item: MenuItem;
  amount: number;
}

export interface BookmarkInfo {
  priceInfo: BookmarkPriceInfo;
  items: BookmarkItem[];
}
