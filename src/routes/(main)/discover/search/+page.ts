import type { PageLoad } from './$types';
import { fly, fade } from 'svelte/transition';

export const load = (() => {
	return {
		transition: {
			in: { fn: fly, props: { duration: 250, delay: 150, y: -10 } },
			out: { fn: fade, props: { duration: 150 } }
		}
	};
}) satisfies PageLoad;
