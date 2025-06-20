<script lang="ts">
	import { X } from '@lucide/svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';

	let autofocusState = $state(false);
	let buttonpressed = $state(false);
	let inputElement: HTMLInputElement | null = $state(null);

	$effect(() => {
		setTimeout(() => {
			inputElement?.focus();
		}, 250); // Try not go too below else transition will flicker.
	});

	function handleSubmit() {
		buttonpressed = true;
		autofocusState = false;
		inputElement?.blur(); 
	}
	
	$inspect(autofocusState)

</script>
<div class="flex-1 overflow-y-auto">
	<div class="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
		<div class="flex items-center justify-between p-4">
			<div class="mr-4 flex-1">
				<form onsubmit={handleSubmit}>
					<Input
						bind:ref={inputElement}
						placeholder="Search Movies, TV Shows, and Anime..."
						class="p-2"
					/>
				</form>
			</div>

			<a href="/discover/">
				<X />
			</a>
		</div>
	</div>

	{#if buttonpressed}
	<p class="px-5">Note, everything is the same due to demo</p>
	<div class="p-5">
		<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
			{#each { length: 30 }, i}
				<div>
					<AspectRatio ratio={2 / 3}>
						<img
							src={'https://image.tmdb.org/t/p/w500/bMSbEx9vXCSGN4NEktjVIEuibn2.jpg'}
							alt="Movie Poster"
							class="h-full w-full rounded-xl object-cover"
							loading="lazy"
						/>
					</AspectRatio>

					<p class="text-muted-foreground truncate pt-1.5 text-center text-sm md:text-base">
						Breaking Bad
					</p>
				</div>
			{/each}
		</div>
	</div>
		
	{/if}
</div>
