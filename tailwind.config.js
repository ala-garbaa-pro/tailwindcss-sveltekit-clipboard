/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				midnight: {
					pitch: 'hsl(0deg 0% 21.57%)',
					spider: 'hsl(0deg 0% 19.22%)',
					metal: 'hsl(0deg 0% 17.25%)',
					grease: 'hsl(0deg 0% 12.55%)',
					crow: 'hsl(0deg 0% 9.8%)'
				},
				silver: {
					50: 'hsl(0deg 0% 83.14%)',
					100: 'hsl(0deg 0% 51.37%)'
				}
			}
		}
	},
	plugins: []
};
