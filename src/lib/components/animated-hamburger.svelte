<script lang="ts">
	import { useSidebar } from '$lib/components/ui/sidebar/context.svelte.js';
	const sidebar = useSidebar();
</script>
<button
	class="hamburger"
	class:checked={sidebar.open}
	onclick={sidebar.toggle}
	aria-label="Toggle Sidebar"
>
	<svg viewBox="0 0 32 32">
		<path
			class="line line-top-bottom"
			d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
		></path>
		<path class="line" d="M7 16 27 16"></path>
	</svg>
</button>

<style>
	.hamburger {
		cursor: pointer;
        background: none;
        border: none;
        padding: 0;
	}

	.hamburger svg {
		height: 2.25em; 
		transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.line {
		fill: none;
		stroke: var(--color-sidebar-foreground);
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 1.7;
		transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
			stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.line-top-bottom {
		stroke-dasharray: 12 63;
	}


	.hamburger.checked svg {
		transform: rotate(-45deg);
	}

	.hamburger.checked svg .line-top-bottom {
		stroke-dasharray: 20 300;
		stroke-dashoffset: -32.42;
	}
</style>