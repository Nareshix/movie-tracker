<script lang="ts">
	import type { Snippet } from 'svelte';
	import AnimatedTabs from '$lib/components/ui/animatedTabs/AnimatedTabs.svelte';
	import { Search } from '@lucide/svelte';
	import { Media } from './sharedStates.svelte';

	const tabs = Media.TABS;
	
	let { children }: { children: Snippet } = $props();
</script>
<div class="h-full overflow-y-auto pb-6">
	<div class="pt-1 pb-3 sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
		<div class="mt-3 flex items-center justify-between mx-4">
			<AnimatedTabs {tabs} bind:activeIndex={Media.activeIndex} />
			<a href="/discover/search">
				<Search />
			</a>
		</div>
	</div>
	
	{@render children?.()}
</div>
