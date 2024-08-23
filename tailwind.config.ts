import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		textShadow: {
			white:
				".75px .75px 0 #FFF, -0.75px -0.75px 0 #FFF, -0.75px .75px 0 #FFF, 0.75px -0.75px 0 #FFF, 0.75px 0px 0 #FFF, 0px .75px 0 #FFF, -0.75px 0px 0 #FFF, 0px -0.75px 0 #FFF",
			black:
				".75px .75px 0 #000, -0.75px -0.75px 0 #000, -0.75px .75px 0 #000, 0.75px -0.75px 0 #000, 0.75px 0px 0 #000, 0px .75px 0 #000, -0.75px 0px 0 #000, 0px -0.75px 0 #000",
		},

		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			boxShadow: {
				"inner-outer":
					"inset 0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
			},
		},
	},
	plugins: [
		// Thanks to https://www.hyperui.dev/blog/text-shadow-with-tailwindcs
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"text-shadow": (value: string) => ({
						textShadow: value,
					}),
				},
				{ values: theme("textShadow") }
			);
		}),
	],
};
export default config;
