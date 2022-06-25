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
			precompress: true
		}),
		appDir: 'internal',
		paths: {
			base: process.env.USE_BASE_PATH ? '/secrets' : ''
		},
		csp: {
			mode: 'hash',
			directives: {
				'default-src': ['self', 'https://api.dropboxapi.com', 'https://www.googleapis.com']
			}
		},
		prerender: {
			default: true
		}
	}
};

export default config;
