import { BehaviorSubject, from, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { Writable, writable } from 'svelte/store';
import type { BookmarkMap } from './model/bookmark-map.interface';

const LOCAL_STORAGE_PREFIX = 'DIGITAL_MENU';
const BOOKMARKS_PREFIX = LOCAL_STORAGE_PREFIX + '_bookmarks_v';
const VERSION = 1;
const BOOKMARKS = BOOKMARKS_PREFIX + VERSION;

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

export const getBookmarkMap = (): Observable<BookmarkMap> =>
  bookmarks$.asObservable();

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
