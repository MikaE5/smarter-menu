import { Writable, writable } from 'svelte/store';

const LOCAL_STORAGE_PREFIX = 'DIGITAL_MENU';
const BOOKMARKS = LOCAL_STORAGE_PREFIX + '_bookmarks';

const getBookmarks = (): string[] => {
  const bookmarks = localStorage.getItem(BOOKMARKS);
  if (bookmarks === null) return [];
  return JSON.parse(bookmarks);
};

const setBookmarks = (newBookmarks: string[]) => {
  bookmarks.set(newBookmarks);
  localStorage.setItem(BOOKMARKS, JSON.stringify(newBookmarks));
};

export const bookmarks: Writable<string[]> = writable(getBookmarks());

export const addToBookmarks = (id: string) => {
  const oldBookmarks = getBookmarks();
  const newBookmarks = [...oldBookmarks, id];
  setBookmarks(newBookmarks);
};

export const deleteFromBookmarks = (id: string) => {
  const oldBookmarks = new Set(getBookmarks());
  if (oldBookmarks.has(id)) {
    oldBookmarks.delete(id);
    setBookmarks(Array.from(oldBookmarks));
  }
};
