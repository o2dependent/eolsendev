import pMap from 'p-map';
import { basename } from 'path';
import type { SvelteComponent } from 'svelte';

const modules = import.meta.glob('./*.svx');

export const projectsList = await pMap(
	Object.entries(modules),
	async function ([filename, module]) {
		// Import the component. The metadata here is added by MDSveX and mirrors
		// the front matter.
		const mod = (await module()) as {
			metadata: {
				title: string;
				summary: string;
				date: string;
				tags: string[];
			};
			default: SvelteComponent;
		};
		const { metadata } = mod;

		return {
			title: metadata.title,
			date: new Date(metadata.date),
			summary: metadata.summary,
			tags: metadata.tags,
			slug: basename(filename, '.svx') // Generate a slug we can link to
		};
	}
);
