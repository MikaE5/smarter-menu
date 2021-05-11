import type { MenuItem } from '../../data/model/menu-item.interface';
import type { BookmarkMap } from '../model/bookmark-map.interface';
import type { BookmarkPriceInfo } from '../model/bookmark-info.interface';

export const getPriceInfo = (
  map: BookmarkMap,
  menuItems: MenuItem[]
): BookmarkPriceInfo => {
  const price = menuItems.reduce((priceCount, item) => {
    return (priceCount += map[item.id] * item.price.amount);
  }, 0);
  const unit = menuItems.length > 0 ? menuItems[0].price.unit : '';
  return { price, unit };
};
