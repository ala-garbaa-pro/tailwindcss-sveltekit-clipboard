export function getLanguageFromClass(className: string): string | null {
    const match = className.match(/language-(\w+)/);
    return match ? match[1] : null;
}