export function formatDateTime(dateTimeString: string, options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    };

    const mergedOptions = { ...defaultOptions, ...options };
    return new Date(dateTimeString).toLocaleString(undefined, mergedOptions);
}
