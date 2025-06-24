import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	return {
		post: {
			title: `Title for ${params.token} goes here`,
			content: `Content for ${params.token} goes here`
		}
	};
};
