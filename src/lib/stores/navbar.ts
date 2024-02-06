import { writable } from "svelte/store";

export const isNavbarOpen = writable(false);
// export const navbarState = writable<"normal-opened" | "normal-closed"|"mobile-opened" | "mobile-closed">("normal-opened");
export const searchState = writable<"opened" | "closed">("closed");