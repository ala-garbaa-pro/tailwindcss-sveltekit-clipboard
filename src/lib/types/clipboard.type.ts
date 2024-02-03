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
}
