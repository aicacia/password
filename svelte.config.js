import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			trailingSlash: 'always',
			precompress: true
		}),
		appDir: 'internal',
		paths: process.env.USE_BASE_PATH
			? {
					base: '/password'
			  }
			: {}
	}
};

export default config;
