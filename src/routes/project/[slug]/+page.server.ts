import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const pagePromise = import(`../../../projects/${params.slug}.svx`);
	const [pageResult] = await Promise.all([pagePromise]);
	const { default: page } = pageResult;
	console.log({ page });
	return { page } as { page: ConstructorOfATypedSvelteComponent };
};
