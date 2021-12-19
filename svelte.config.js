import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		paths: process.env.USE_BASE_PATH
			? {
					base: '/password'
			  }
			: {},
		target: '#app',
		ssr: false
	}
};

export default config;
