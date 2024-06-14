import React from "react";

interface SmallLogoProps {
	width?: number;
	height?: number;
	color?: string;
}

const SmallLogo: React.FC<SmallLogoProps> = ({
	width = 60,
	height = 60,
	color = "black",
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 110.11 76.34"
			aria-hidden="true"
			width={width}
			height={height}
			fill={color}
		>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M64.22,56.25c-1.49,1.15-4.47-1.76-5.58-.57-2.33,2.49-.4,6.72,3.91,7.63,5.85,1.19,9.15-5.56,7.39-10.63-6.74-15.3-24.59-4.75-23.85,9.21,2.81,24.86,44.52,14.86,35.23-8.95-4.84-12.99-17.95-17.03-28.46-22.36-4.93-2.24-9.17-7.59-14.22-11.09-5.86-5.02-7.49-5.6-12.38-11.2-1.69-2.13-5.22-7.87-5.46-8.29-.9,2.95,3.09,12.11,8.37,16.47,7.07,5.85,6.57,5.33,13.28,12.08,7.32,6.28,12.04,8.62,22.54,12.8,5.79,2.64,10.75,9.02,12.34,15.64,1.72,16.71-20.19,19.98-25.58,7.64-4.38-8.58,7.14-21.78,13.29-12.63.45.93.9,2.9-.83,4.24Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M100.16,70.87c.34-.64.07-1.08-.32-1.53-1.66-1.92-3.48-3.57-5.57-4.77-.06-.03-.09-.11-.25-.31.6-.1,1.1-.25,1.61-.26,1.97-.05,3.94-.07,5.91-.06,2.4.02,4.8.06,7.19.13,2.92,0,.4-2.24-.6-3.07-2.29-1.66-3.96-2.4-6.56-3.19-2.76-.84-5.58-1.49-8.42-1.9-2.91-.42-5.86-.44-8.79-.62-.3-.02-.61.09-.91.14.16,1.47,1.01,2.33,2.03,2.41,2.71.2,5.43.36,8.13.73,2.7.38,5.37.95,8.04,1.54,1.08.24,2.13.72,3.19,1.11.19.07.35.22.49.55-.34-.01-.67-.03-1.01-.03-5.37-.12-10.75-.17-16.11.53-1.21.16-2.32.54-3.45,1.13-1.75.92-2.14,2.56-1.28,2.64.62.06,1.45-.46,2.09-.61,1.83-.43,3.36-.06,5.02.39,3.17.85,5.99,2.35,8.65,4.65.2.17.43.3.65.43.05.03.14,0,.26-.02Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M.04,8.74c-.18.26.34,1.28,1.37,2.74.98,1.39,2.4,3.08,3.83,4.56,3.09,3.19,6.06,4.92,9.19,6.39,5.14,2.41,3.75,1.79,9.15,3.56,10.33,3.39,12.33,10.51,22.65,13.46,5.5,1.57,7.2,1.05,3.41-.78-17.41-8.41-13.36-11.92-24.36-15.55-5.41-1.79-5.43-1.22-10.63-3.72-4.71-2.27-4.38-1.82-9.31-5.87-1.46-1.19-2.89-2.36-5.29-4.79v.02Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M41.29,45.49c1.33.33,2.71.32,3.97.06s2.42-.84,3.38-1.87c.58-.62.11-.59-.81-.47s-2.32.32-3.59.04-2.59-.7-3.83-1.19-2.43-1.08-3.59-1.71c-1.7-.93-3.45-1.72-5.25-2.36s-3.65-1.14-5.53-1.49c-2.31-.35-4.45-.13-6.52.21s-4.07.79-6.09.93c-.66.04-1.75.02-2.83-.04s-2.15-.17-2.78-.3c-.49-.1-.48.01-.31.18s.51.39.67.52c.29.23.65.44,1.03.63s.79.36,1.18.5c1.93.82,4.31.81,6.66.62s4.64-.57,6.4-.49c1.87.08,3.38.43,4.77.92s2.67,1.11,4.09,1.72c.84.36,2.63,1.29,3.46,1.65,1.04.46,3.84,1.53,5.54,1.95Z"
			/>
		</svg>
	);
};

export default SmallLogo;
