import { Writable, writable } from 'svelte/store';
import type { MenuItem } from '../data/model/menu-item.interface';

export const currentMenuItems$: Writable<MenuItem[]> = writable([]);
export const currentFilteredMenuItems$: Writable<MenuItem[]> = writable([]);
