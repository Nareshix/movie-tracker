<script lang="ts">
	import { cubicOut, quadOut } from 'svelte/easing';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { Media } from './sharedStates.svelte';

	let previousIndex = 0;
	let activeIndex = $derived(Media.activeIndex);
	let direction = $state();
	const tabs = Media.TABS;
	let activeTabName = $derived(tabs[activeIndex]);
	
	$effect.pre(() => {
		if (activeIndex > previousIndex) {
			direction = 'right';
		} else if (activeIndex < previousIndex) {
			direction = 'left';
		}
		previousIndex = activeIndex;
	});

	function quickSlide(
		node: Element,
		{ duration = 200, x = 50, delay = 0 }: { duration?: number; x?: number; delay?: number }
	) {
		return {
			duration,
			delay,
			easing: cubicOut,
			css: (t: number) => `
		  transform: translateX(${(1 - t) * x}px);
		  opacity: ${t};
		`
		};
	}
</script>

{#key activeIndex}
	<div 
		in:quickSlide={{
			x: direction === 'right' ? -10 : 10,
			duration: 150,
			delay: 150
		}}
		out:quickSlide={{
			x: direction === 'right' ? 10 : -10,
			duration: 150
		}}
	>
		<div class="mt-6">
			<h2 class="px-4 pb-3 text-xl font-bold">Trending</h2>

			<div class="flex flex-row gap-4 overflow-x-auto px-4">
				{#each { length: 8 }, i}
					<div class="w-32 shrink-0 md:w-52">
						<AspectRatio ratio={2 / 3}>
							<img
								src={activeTabName === 'TV Shows'
									? 'https://image.tmdb.org/t/p/original/1jw95TiRAvITZk22DJVMbhFeLSG.jpg'
									: 'https://image.tmdb.org/t/p/original/dqZENchTd7lp5zht7BdlqM7RBhD.jpg'}
								alt="Movie Poster"
								class="h-full w-full rounded-xl object-cover"
								loading="lazy"
							/>
						</AspectRatio>
						<p class="text-muted-foreground pt-1.5 text-center text-sm md:text-base">Frieren</p>
					</div>
				{/each}
			</div>
		</div>
		<!-- Most popular -->
		{#each { length: 8 }, i}
		<div class="mt-6">
			<h2 class="px-4 pb-3 text-xl font-bold">Most Populalr</h2>

			<div class="flex flex-row gap-4 overflow-x-auto px-2">
				{#each { length: 8 }, i}
					<div class="w-32 shrink-0 md:w-52">
						<AspectRatio ratio={2 / 3}>
							<img
								src={activeTabName === 'TV Shows'
									? 'https://image.tmdb.org/t/p/original/dqZENchTd7lp5zht7BdlqM7RBhD.jpg'
									: 'https://image.tmdb.org/t/p/original/1jw95TiRAvITZk22DJVMbhFeLSG.jpg'}
								alt="Movie Poster"
								class="h-full w-full rounded-xl object-cover"
								loading="lazy"
							/>
						</AspectRatio>
						<p class="text-muted-foreground pt-1.5 text-center text-sm md:text-base">Frieren</p>
					</div>
				{/each}
			</div>
		</div>
			
		 {/each}

	</div>
{/key}
