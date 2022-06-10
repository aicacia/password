/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			sm: '512px',
			md: '640px',
			lg: '768px',
			xl: '896px'
		}
	},
	plugins: []
};

module.exports = config;
