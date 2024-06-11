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
	openFromLeft: {
		animation: "openFromLeft .75s ease-in forwards",
		keyframes: {
			"0%": {
				width: "50%",
			},
			"100%": {
				width: "0%",
			},
		},
	},
	openFromRight: {
		animation: "openFromRight .75s ease-in forwards",
		keyframes: {
			"0%": {
				width: "50%",
			},
			"100%": {
				width: "0%",
			},
		},
	},
	clearFromTop: {
		animation: "clearFromTop .75s ease-in forwards",
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
		animation: "clearFromBottom .75s ease-in forwards",
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
