import { Writable, writable } from 'svelte/store';
import type { PageConfig } from '../data/model/page-config.interface';

export const pageConfigStore: Writable<PageConfig> = writable(undefined);
export const homePathStore: Writable<string> = writable('');
