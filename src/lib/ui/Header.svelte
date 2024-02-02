<script lang="ts">
	import { navbarState } from '$lib/stores/navbar';
	import Icon from './Icon.svelte';
</script>

<div class="flex bg-green-600/5 w-full justify-between items-center overflow-hidden h-11 px-3 pr-2">
	<div class="flex">
		<div class="flex">
			{#if $navbarState !== 'normal-opened'}
				<button class="flex" on:click={() => navbarState.set('normal-opened')}>
					<Icon descriptors={['M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z']} />
				</button>
			{/if}
			<span>ACTION</span>
		</div>
	</div>
	<div class="flex">SETTINGS</div>
</div>
