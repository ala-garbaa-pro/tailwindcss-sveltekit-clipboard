<!-- FILE: +page.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';

	export let data;
	const { clipboard } = data;

	onMount(() => {
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
			copyButton.className = 'flex gap-1 items-center'; // Add the class for styling
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
	});

	function copyText(text: string, event: Event) {
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

	function getLanguageFromClass(className: string): string | null {
		const match = className.match(/language-(\w+)/);
		return match ? match[1] : null;
	}
</script>

{#if clipboard && Object.keys(clipboard).length > 0}
	<div class="px-6 py-32 rounded lg:px-8">
		<div class="max-w-3xl mx-auto text-base leading-7 text-gray-100">
			<p class="text-base font-semibold leading-7 text-blue-400">
				<a class="flex items-center mb-10" href="/"
					><svg
						class="mr-2"
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 16 16"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
						></path></svg
					>Return Home</a
				>
			</p>
			<p class="flex items-center mb-2 text-blue-500/40">#{clipboard.id}</p>

			<h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
				{clipboard.title}
			</h1>
			<p class="mt-6 text-xl leading-8 text-gray-50">{clipboard.keywords}</p>
			<div class="max-w-2xl mt-10">{@html clipboard.content}</div>
		</div>
	</div>
{:else}
	Loading...
{/if}
