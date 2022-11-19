import type { ProjectMetadata } from '$types/projectMetadata';
import type { PageLoad } from './$types';

export const srr = false;
export const preload = true;

interface PageLoadReturn {
	page: ConstructorOfATypedSvelteComponent;
	metadata: ProjectMetadata;
}

export const load: PageLoad<PageLoadReturn> = async ({ params: { slug } }) => {
	const pagePromise = import(`../../../projects/${slug}.svx`);
	const [pageResult] = await Promise.all([pagePromise]);

	const { default: pageRes, metadata: resMetadata } = pageResult;

	const page = pageRes as ConstructorOfATypedSvelteComponent;

	const metadata: ProjectMetadata = {
		date: new Date(resMetadata.date),
		summary: resMetadata.summary,
		tags: resMetadata.tags,
		title: resMetadata.title
	};

	return { page, metadata };
};
