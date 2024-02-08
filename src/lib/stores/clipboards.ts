import type { ClipboardStoreType } from "$lib/types/clipboard.type";
import { writable } from "svelte/store";


const initialData: ClipboardStoreType = {
    items: [],
    totalPages: 0,
    totalItems: 0,
    loadedItems: 0,
    perPage: 8,
    page: 1,
};

export const clipboardsStore = writable(initialData);
