export const transitionStyles = {
	clearScreen: {
		animation: "clearScreen 2s forwards",
		keyframes: {
			"0%": {
				height: "0%",
				width: "0%",
				opacity: "40%",
			},
			"100%": {
				height: "100%",
				width: "100%",
				opacity: "100%",
			},
		},
	},
	clearFromLeft: {
		animation: "clearFromLeft 1s ease-in forwards",
		keyframes: {
			"0%": {
				width: "0%",
			},
			"100%": {
				width: "50%",
			},
		},
	},
	clearFromRight: {
		animation: "clearFromRight 1s ease-in forwards",
		keyframes: {
			"0%": {
				width: "0%",
			},
			"100%": {
				width: "50%",
			},
		},
	},
	clearFromTop: {
		animation: "clearFromTop 1s ease-in forwards",
		keyframes: {
			"0%": {
				height: "0%",
			},
			"100%": {
				height: "50%",
			},
		},
	},
	clearFromBottom: {
		animation: "clearFromBottom 1s ease-in forwards",
		keyframes: {
			"0%": {
				height: "0%",
			},
			"100%": {
				height: "50%",
			},
		},
	},
};
