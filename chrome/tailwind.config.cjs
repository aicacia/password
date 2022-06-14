/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const config = require('../tailwind.config.cjs');

config.content.push('../package/**/*.{html,js,svelte,ts}');
config.corePlugins.preflight = false;

module.exports = config;
