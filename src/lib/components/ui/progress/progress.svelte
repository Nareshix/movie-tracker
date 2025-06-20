<script lang="ts">
	import { Progress as ProgressPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		max = 100,
		value,
		...restProps
	}: WithoutChildrenOrChild<ProgressPrimitive.RootProps> = $props();
</script>

<ProgressPrimitive.Root
	bind:ref
	data-slot="progress"
	class={cn("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className)}
	{value}
	{max}
	{...restProps}
>
	<div
		data-slot="progress-indicator"
        
		class="
            bg-primary h-full w-full flex-1 
            transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            will-change-transform
        "
		style="transform: translateX(-{100 - (100 * (value ?? 0)) / (max ?? 1)}%)"
	></div>
</ProgressPrimitive.Root>