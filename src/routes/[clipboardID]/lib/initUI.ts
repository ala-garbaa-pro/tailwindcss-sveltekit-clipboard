import type { Writable } from "svelte/store";
import { copyText } from "./copyText";
import { getLanguageFromClass } from "./getLanguageFromClass";

export function initUI(searchState: Writable<"opened" | "closed">) {
    searchState.set('closed');

    window.Prism.highlightAll();

    const preElements: NodeListOf<HTMLPreElement> =
        document.querySelectorAll('pre[class^="language-"]');

    preElements.forEach((preElement) => {
        const preText: string = preElement.textContent || '';
        const language: string | null = getLanguageFromClass(preElement.className);

        const container: HTMLDivElement = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.right = '0';
        container.style.display = 'flex';
        container.style.width = '100%';
        container.style.padding = '4px 8px';
        container.style.justifyContent = 'space-between';
        container.style.backgroundColor = 'rgb(0, 0, 0)';
        container.style.userSelect = 'none';

        const copyButton: HTMLButtonElement = document.createElement('button');
        copyButton.className = 'flex items-center gap-1'; // Add the class for styling
        copyButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path>
            </svg><span>Copy code</span>`;
        copyButton.style.cursor = 'pointer';
        copyButton.addEventListener('click', (event) => copyText(preText, event));

        const codeLabel: HTMLSpanElement = document.createElement('span');
        codeLabel.innerText = language || 'CODE';
        codeLabel.style.position = 'relative';
        codeLabel.style.top = '0';
        codeLabel.style.left = '8px';

        container.appendChild(codeLabel);
        container.appendChild(copyButton);

        const parentElement: Element | null = preElement;

        if (parentElement) {
            parentElement.appendChild(container);
        }
    });
}