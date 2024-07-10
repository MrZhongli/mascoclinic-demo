/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: "var(--primary)",
				"primary-800": "var(--primary-800)",
				"primary-600": "var(--primary-600)",
				"primary-200": "var(--primary-200)",
				secondary: "var(--secondary)",
				"secondary-600": "var(--secondary-600)",
				"secondary-400": "var(--secondary-400)",
				"secondary-200": "var(--secondary-200)",
			},
		},
	},
	plugins: [],
};
