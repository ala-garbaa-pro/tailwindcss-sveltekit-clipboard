export function copyText(text: string, event: Event) {
    const copyButton: HTMLButtonElement = event.currentTarget as HTMLButtonElement;
    const originalContent = copyButton.innerHTML;

    navigator.clipboard
        .writeText(text)
        .then(() => {
            copyButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0633 5.67375C18.5196 5.98487 18.6374 6.607 18.3262 7.06331L10.8262 18.0633C10.6585 18.3093 10.3898 18.4678 10.0934 18.4956C9.79688 18.5234 9.50345 18.4176 9.29289 18.2071L4.79289 13.7071C4.40237 13.3166 4.40237 12.6834 4.79289 12.2929C5.18342 11.9023 5.81658 11.9023 6.20711 12.2929L9.85368 15.9394L16.6738 5.93664C16.9849 5.48033 17.607 5.36263 18.0633 5.67375Z" fill="currentColor"></path>
            </svg><span>Copied!</span>`;

            setTimeout(() => {
                copyButton.innerHTML = originalContent;
            }, 3000); // Set the timeout duration in milliseconds (3 seconds in this case)
        })
        .catch((err) => {
            console.error('Unable to copy text to clipboard', err);
        });
}