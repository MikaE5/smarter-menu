import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import type { BookmarkMap } from './model/bookmark-map.interface';

const LOCAL_STORAGE_PREFIX = 'DIGITAL_MENU';
const BOOKMARKS_PREFIX = LOCAL_STORAGE_PREFIX + '_bookmarks_v';
const VERSION = 1;
const BOOKMARKS = BOOKMARKS_PREFIX + VERSION;
const BOOKMARK_OVERALL_COUNT_LISTENER = '$bookmark_overall_count$!';
const BOOKMARKS_LISTENER = '$bookmark$!';

export const deleteOldLocalStorageVersions = () => {
  let i = 1;
  while (i < VERSION) {
    const item = BOOKMARKS_PREFIX + i;
    localStorage.removeItem(item);
  }
};

const getBookmarks = (): BookmarkMap => {
  const bookmarks = localStorage.getItem(BOOKMARKS);
  if (bookmarks === null) return {};
  return JSON.parse(bookmarks);
};

const bookmarks$: BehaviorSubject<BookmarkMap> = new BehaviorSubject(
  getBookmarks()
);

const bookmarkSubscriptionMap: { [id: string]: Subscription[] } = {};

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
  Object.values(bookmarkSubscriptionMap).forEach((subArray) =>
    subArray.forEach((sub) => sub.unsubscribe())
  );
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

export const addBookmarksListener = (
  listener: (map: BookmarkMap) => void
): number => {
  return addListener(
    BOOKMARKS_LISTENER,
    bookmarks$.subscribe((map: BookmarkMap) => listener(map))
  );
};

export const removeBookmarksListener = (listenerId: number) =>
  removeListener(BOOKMARKS_LISTENER, listenerId);

const setBookmarks = (newBookmarks: BookmarkMap) => {
  bookmarks$.next(newBookmarks);
  localStorage.setItem(BOOKMARKS, JSON.stringify(newBookmarks));
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
