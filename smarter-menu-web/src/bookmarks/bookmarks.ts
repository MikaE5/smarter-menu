import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { getMenuItemsByIds } from '../data/data';
import type { MenuItem } from '../data/model/menu-item.interface';
import type { BookmarkMap } from './model/bookmark-map.interface';
import type { BookmarkInfo } from './model/bookmark-info.interface';
import { getPriceInfo } from './util/bookmarks.util';

const LOCAL_STORAGE_PREFIX = 'SMARTER_MENU';
const BOOKMARKS_PREFIX = LOCAL_STORAGE_PREFIX + '_bookmarks_v';
const VERSION = 1;
const BOOKMARKS = BOOKMARKS_PREFIX + VERSION;
const BOOKMARK_OVERALL_COUNT_LISTENER = '$bookmark_overall_count$!';
const BOOKMARK_OVERALL_PRICE_LISTENER = '$bookmark_overall_price$!';
const BOOKMARKS_LISTENER = '$bookmark$!';

let bookmarkCustomer = '';

export const deleteOldLocalStorageVersions = () => {
  let i = 1;
  while (i < VERSION) {
    const item = bookmarkCustomer + BOOKMARKS_PREFIX + i;
    localStorage.removeItem(item);
  }
};

export const setBookmarkCustomer = (customer: string) => {
  //removeAllBookmarkSubscriptions();
  bookmarkCustomer = customer;
  bookmarks$.next(getBookmarks());
};

const getLocalStorageBookmark = (): string => bookmarkCustomer + BOOKMARKS;

const getBookmarks = (): BookmarkMap => {
  const bookmarks = localStorage.getItem(getLocalStorageBookmark());
  if (bookmarks === null) return {};
  return JSON.parse(bookmarks);
};

let bookmarks$: BehaviorSubject<BookmarkMap> = new BehaviorSubject(
  getBookmarks()
);

let bookmarkSubscriptionMap: { [id: string]: Subscription[] } = {};

const addListener = (id: string, sub: Subscription): number => {
  if (bookmarkSubscriptionMap[id] === undefined) {
    bookmarkSubscriptionMap[id] = [];
  }
  // return index in sub array of added sub
  return bookmarkSubscriptionMap[id].push(sub) - 1;
};

const removeListener = (id: string, listenerId: number) => {
  if (
    bookmarkSubscriptionMap[id] !== undefined &&
    listenerId !== undefined &&
    bookmarkSubscriptionMap[id].length > listenerId &&
    listenerId >= 0
  ) {
    bookmarkSubscriptionMap[id][listenerId].unsubscribe();
    bookmarkSubscriptionMap[id].splice(listenerId, 1);
  }
};

export const removeAllBookmarkSubscriptions = () => {
  Object.values(bookmarkSubscriptionMap).forEach((subArray) => {
    subArray.forEach((sub) => sub.unsubscribe());
    subArray = [];
  });
  bookmarkSubscriptionMap = {};

  bookmarks$.unsubscribe();
};

export const addBookmarkCountListener = (
  id: string,
  listener: (count: number) => void
): number => {
  return addListener(
    id,
    bookmarks$
      .pipe(map((map: BookmarkMap) => map[id]))
      .subscribe((count: number) => {
        //if (count !== undefined) {
        listener(count);
        //}
      })
  );
};

export const removeBookmarkCountListener = (id: string, listenerId: number) => {
  removeListener(id, listenerId);
};

export const addBookmarkOverallCountListener = (
  listener: (count: number) => void
): number => {
  return addListener(
    BOOKMARK_OVERALL_COUNT_LISTENER,
    bookmarks$
      .pipe(
        map((map: BookmarkMap) => Object.values(map)),
        map((counts: number[]) =>
          counts.reduce((counter, val) => (counter += val), 0)
        )
      )
      .subscribe((count: number) => listener(count))
  );
};

export const removeBookmarkOverallCountListener = (listenerId: number) =>
  removeListener(BOOKMARK_OVERALL_COUNT_LISTENER, listenerId);

export const removeBookmarkOverallPriceListener = (listenerId: number) =>
  removeListener(BOOKMARK_OVERALL_PRICE_LISTENER, listenerId);

export const addBookmarkOverallPriceListener = (
  listener: (price: number, unit: string) => void
): number => {
  return addListener(
    BOOKMARK_OVERALL_PRICE_LISTENER,
    bookmarks$.subscribe(async (map: BookmarkMap) => {
      const menuItems: MenuItem[] = await getMenuItemsByIds(Object.keys(map));
      const { price, unit } = getPriceInfo(map, menuItems);

      listener(price, unit);
    })
  );
};

export const addBookmarksListener = (
  listener: (bookmarkInfo: BookmarkInfo) => void
): number => {
  return addListener(
    BOOKMARKS_LISTENER,
    bookmarks$.subscribe(async (map: BookmarkMap) => {
      const menuItems: MenuItem[] = await getMenuItemsByIds(Object.keys(map));
      const items = menuItems.map((item) => {
        return {
          item,
          amount: map[item.id],
        };
      });
      const priceInfo = getPriceInfo(map, menuItems);
      listener({ items, priceInfo });
    })
  );
};

export const removeBookmarksListener = (listenerId: number) =>
  removeListener(BOOKMARKS_LISTENER, listenerId);

const setBookmarks = (newBookmarks: BookmarkMap) => {
  bookmarks$.next(newBookmarks);
  localStorage.setItem(getLocalStorageBookmark(), JSON.stringify(newBookmarks));
};

export const addToBookmarks = (id: string) => {
  const bookmarks = getBookmarks();

  if (bookmarks[id] === undefined) {
    bookmarks[id] = 1;
  } else {
    bookmarks[id]++;
  }
  setBookmarks(bookmarks);
};

export const reduceBookmark = (id: string) => {
  const bookmarks = getBookmarks();
  if (bookmarks[id] !== undefined) {
    bookmarks[id]--;
    if (bookmarks[id] <= 0) {
      delete bookmarks[id];
    }
    setBookmarks(bookmarks);
  }
};

export const deleteFromBookmarks = (id: string) => {
  const bookmarks = getBookmarks();
  delete bookmarks[id];
  setBookmarks(bookmarks);
};
