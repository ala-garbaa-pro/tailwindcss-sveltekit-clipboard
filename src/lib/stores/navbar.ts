import { writable } from "svelte/store";

export const navbarState = writable<"normal-opened" | "normal-closed">("normal-opened");
export const searchState = writable<"opened" | "closed">("closed");