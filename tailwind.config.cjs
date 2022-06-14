/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	prefix: 'as-',
	theme: {
		screens: {
			sm: '512px',
			md: '640px',
			lg: '768px',
			xl: '896px'
		},
		extend: {
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				}
			},
			animation: {
				wiggle: 'wiggle 1s ease-in-out infinite'
			}
		}
	},
	corePlugins: {
		preflight: true
	},
	plugins: []
};

module.exports = config;
