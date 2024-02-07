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


export const initLocalStorage = () => {
    localStorage.setItem(keyUserCache, JSON.stringify(initialUserCache));
};


export const setDataToLS = (newData: UserCacheStoreType) => {
    localStorage.setItem(keyUserCache, JSON.stringify(newData));
};


export const getLSData = () => {
    const data = localStorage.getItem(keyUserCache);
    if (data) {
        return JSON.parse(data);
    } else {
        initLocalStorage();
        return initialUserCache;
    }
}

export const addRecent = (clipboard: Clipboard) => {

    const userCache: UserCacheStoreType = getLSData();

    const isRecentAlreadyExists = userCache.history.find(item => item.id === clipboard.id);
    const isRecentAlreadyExistsInFavorites = userCache.favorites.find(item => item.id === clipboard.id);

    if (isRecentAlreadyExists || isRecentAlreadyExistsInFavorites) return userCache

    const newHistory = userCache.history;

    newHistory.unshift(clipboard);

    const newData: UserCacheStoreType = { ...userCache, history: newHistory }

    setDataToLS(newData)

    return newData
};



export const removeRecent = (id: string) => {
    const userCache: UserCacheStoreType = getLSData();

    const isRecentAlreadyExistsInHistory = userCache.history.find(item => item.id === id);
    if (!isRecentAlreadyExistsInHistory) return userCache

    const history = userCache.history.filter(item => item.id !== id);

    const newData: UserCacheStoreType = { ...userCache, history }

    setDataToLS(newData)

    return newData
};

export const addFavorite = (clipboard: Clipboard) => {

    const userCache: UserCacheStoreType = getLSData();

    const history = userCache.history.filter(item => item.id !== clipboard.id);

    const favorites = userCache.favorites;

    favorites.unshift(clipboard);

    const newData: UserCacheStoreType = { favorites, history }

    setDataToLS(newData)

    return newData
};



export const removeFavorite = (id: string) => {
    const userCache: UserCacheStoreType = getLSData();

    const newFavorites = userCache.favorites.filter(item => item.id !== id);

    const newData: UserCacheStoreType = { ...userCache, favorites: newFavorites }

    setDataToLS(newData)

    return newData
};
