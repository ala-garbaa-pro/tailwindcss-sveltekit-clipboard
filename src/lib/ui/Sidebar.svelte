<script>
	import { isNavbarOpen } from '$lib/stores/navbar';
	import Icon from '$lib/ui/Icon.svelte';
	import AppName from '$lib/ui/AppName.svelte';
	import { slide } from 'svelte/transition';
	import { userCacheStore } from '$lib/stores/userCacheStore';

	let isHoveringNavbar = false;
</script>

<nav
	class={$isNavbarOpen ? 'opened' : 'closed'}
	in:slide={{ axis: 'x', duration: 500 }}
	out:slide={{ axis: 'x', duration: 500 }}
	on:mouseenter={() => (isHoveringNavbar = true)}
	on:mouseleave={() => (isHoveringNavbar = false)}
	aria-label="Sidebar"
>
	<div class="flex h-6 w-52">
		<AppName />

		{#if isHoveringNavbar}
			<!-- https://pictogrammers.com/library/mdi/icon/chevron-double-left/ -->
			<button class="flex" on:click={() => isNavbarOpen.set(false)}>
				<Icon
					descriptors={[
						'M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z'
					]}
				/>
			</button>
		{/if}
	</div>

	<div class="flex flex-col mt-4 space-y-1">
		<p class="mt-4 font-semibold text-md">Favorites</p>
		{#each $userCacheStore.favorites as { title, id }}
			<a
				data-sveltekit-reload
				href={`/${id}`}
				class="px-4 py-1 truncate rounded cursor-pointer hover:bg-midnight-pitch">{title}</a
			>
		{/each}

		<div class="w-4 h-4" />

		<p class="font-semibold text-md">Recent</p>
		{#each $userCacheStore.history as { title, id }}
			<a
				data-sveltekit-reload
				href={`/${id}`}
				class="px-4 py-1 truncate rounded cursor-pointer hover:bg-midnight-pitch">{title}</a
			>
		{/each}
	</div>
</nav>

<style>
	/* .autohide-opened {
		@apply block text-sm bg-midnight-grease w-60 px-4 py-4 absolute left-0 h-[60vh] my-[20vh] rounded-e-md border-solid border-[0.50px] border-gray-600 shadow-md;
	} */

	.opened {
		@apply block fixed text-sm bg-midnight-grease h-screen w-60 px-4 py-4;
	}

	.closed {
		@apply hidden;
	}
</style>
