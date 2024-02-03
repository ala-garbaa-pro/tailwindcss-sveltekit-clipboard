import type { ClipboardStoreType } from "$lib/types/clipboard.type";
import { writable } from "svelte/store";


const initialData: ClipboardStoreType = {
    items: [],
    totalPages: 0,
    totalItems: 0,
    perPage: 10, // You can set your default perPage value here
    page: 1,
};

export const clipboardsStore = writable(initialData);
