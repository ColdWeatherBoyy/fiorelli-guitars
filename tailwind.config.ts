import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { transitionStyles } from "./app/style/tailwind/animations.tailwind";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		textShadow: {
			white: `
        .75px .75px 0 #FFF,
        -.75px -.75px 0 #FFF,
        -.75px .75px 0 #FFF,
        .75px -.75px 0 #FFF,
        .75px 0px 0 #FFF,
        0px .75px 0 #FFF,
        -.75px 0px 0 #FFF,
        0px -.75px 0 #FFF
      `,
		},
		extend: {
			animation: {
				clearFromLeft: transitionStyles.clearFromLeft.animation,
				clearFromRight: transitionStyles.clearFromRight.animation,
				clearFromTop: transitionStyles.clearFromTop.animation,
				clearFromBottom: transitionStyles.clearFromBottom.animation,
			},
			keyframes: {
				clearFromLeft: transitionStyles.clearFromLeft.keyframes,
				clearFromRight: transitionStyles.clearFromRight.keyframes,
				clearFromTop: transitionStyles.clearFromTop.keyframes,
				clearFromBottom: transitionStyles.clearFromBottom.keyframes,
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
