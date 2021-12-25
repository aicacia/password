import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import serve from 'rollup-plugin-serve';
import typescript from '@rollup/plugin-typescript';
import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/manifest.json',
	output: {
		dir: 'dist',
		format: 'esm'
	},
	plugins: [
		chromeExtension(),
		simpleReloader(),
		svelte({
			preprocess: sveltePreprocess(),
			compilerOptions: {
				dev: !production
			},
			emitCss: true
		}),
		postcss({ minimize: production }),
		typescript({ sourceMap: production }),
		resolve({ browser: true, dedupe: ['svelte'] }),
		commonjs(),
		// production && terser(),
		!production &&
			serve({
				contentBase: ['dist'],
				host: 'localhost',
				port: 3000
			})
	]
};
