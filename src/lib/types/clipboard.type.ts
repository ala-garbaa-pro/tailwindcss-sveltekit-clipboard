export type Clipboard = {
    id: string;
    title: string;
    keywords: string;
    content: string;
    created: string;
    updated: string;
};


export type ClipboardStoreType = {
    items: Clipboard[];
    totalPages: number;
    totalItems: number;
    perPage: number;
    page: number;
    loadedItems: number;
}


export const validSearchTypes = ['title', 'keywords', 'content'] as const

export type SearchClipboardByType = typeof validSearchTypes[number]

export type ClipboardSearchResponseType = {
    updated: string;
    id: string;
    keywords: string;
    title: string;
}