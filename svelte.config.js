import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
		mdsvex(mdsvexConfig)
	],

	kit: {
		adapter: adapter(),

		// Add aliases for custom folders
		alias: {
			$utils: 'src/utils',
			$types: 'src/types',
			$dtos: 'src/dtos',
			$actions: 'src/actions'
		}
	}
};

export default config;
