import type { Clipboard } from "$lib/types/clipboard.type";
import { writable } from "svelte/store";

export type UserCacheStoreType = {
    history: Clipboard[],
    favorites: Clipboard[],
}

export const keyUserCache = 'user-cache'

// L = Local; S = Storage; C = Cached; D = Data -> LSCD
export const initialUserCache: UserCacheStoreType = {
    history: [],
    favorites: [],
};

export const userCacheStore = writable(initialUserCache);
