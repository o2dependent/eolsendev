import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	rehypePlugins: [[rehypeAutolinkHeadings, { behavior: 'after' }]]
});

export default config;
