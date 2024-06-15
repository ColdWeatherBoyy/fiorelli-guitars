import React from "react";

interface FullLogoProps {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
}

const FullLogo: React.FC<FullLogoProps> = ({
	width = 200,
	height = 100,
	color = "black",
	className = "",
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 237.16 94.28"
			width={width}
			height={height}
			fill={color}
			className={className}
		>
			<defs>
				<symbol id="Fiorelli_i" data-name="Fiorelli i" viewBox="0 0 10.05 28.47">
					<g>
						<path
							strokeWidth="0px"
							fillRule="evenodd"
							d="M6.67,7.43c.11.32.13,1.43.13,1.43,0,0-.53,10.55-.14,14.03.2,1.82.52,2.65,1.26,3.82.31.49.46.78.29,1.21-.22.56-2.37.48-3.84.5s-3.11.11-3.33-.04c-.37-.24-.23-.89.12-1.26,1.05-1.09,1.21-1.16,1.26-2.62.14-4.1.05-12.57.05-12.57,0-1.11-.07-1.99-.5-2.93-.29-1.04.41-1.37,1.47-1.63,1.3-.29,2.97-.72,3.23.05Z"
						/>
						<path
							strokeWidth="0px"
							fillRule="evenodd"
							d="M.05,2.01c-.24-.55.34-.43,1.99-.62C4.84,1.07,7.39.14,9.61,0S4.5,2.68,3.44,2.95C.69,3.67.76,3.68.05,2.01Z"
						/>
					</g>
				</symbol>
				<symbol id="New_Symbol" data-name="New Symbol" viewBox="0 0 10.15 36.97">
					<path
						strokeWidth="0px"
						fillRule="evenodd"
						d="M5.82,36.95c-2.45-.02-2.65.02-4.92.02-.89,0-.48-1.02.08-1.54,1.04-.96,1.02-1.35,1.01-2.36.08-6.47.24-13.1.35-19.57.03-1.6-.03-4.72.03-6.31.06-1.67-.28-3.71-1.74-4.4-.31-.15-.95-.66-.47-.68C5.57,1.88,7.02.27,10.05,0c.66-.06-2.16,1.58-2.42,1.77-1.11.8-1.03,1.49-1.05,2.71-.11,8.58-.15,18.67-.26,27.25-.02,1.38.41,2.32,1.17,3.54.37.59,1.04,1.7-1.67,1.68Z"
					/>
				</symbol>
			</defs>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M45.9,56.25c1.49,1.15,4.47-1.76,5.58-.57,2.33,2.49.4,6.72-3.91,7.63-5.85,1.19-9.15-5.56-7.39-10.63,6.74-15.3,24.59-4.75,23.85,9.21-2.81,24.86-44.52,14.86-35.23-8.95,4.84-12.99,17.95-17.03,28.46-22.36,4.93-2.24,9.17-7.59,14.22-11.09,5.86-5.02,7.49-5.6,12.38-11.2,1.69-2.13,5.22-7.87,5.46-8.29.9,2.95-3.09,12.11-8.37,16.47-7.07,5.85-6.57,5.33-13.28,12.08-7.32,6.28-12.04,8.62-22.54,12.8-5.79,2.64-10.75,9.02-12.34,15.64-1.72,16.71,20.19,19.98,25.58,7.64,4.38-8.58-7.14-21.78-13.29-12.63-.45.93-.9,2.9.83,4.24Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M9.95,70.87c-.34-.64-.07-1.08.32-1.53,1.66-1.92,3.48-3.57,5.57-4.77.06-.03.09-.11.25-.31-.6-.1-1.1-.25-1.61-.26-1.97-.05-3.94-.07-5.91-.06-2.4.02-4.8.06-7.19.13-2.92,0-.4-2.24.6-3.07,2.29-1.66,3.96-2.4,6.56-3.19,2.76-.84,5.58-1.49,8.42-1.9,2.91-.42,5.86-.44,8.79-.62.3-.02.61.09.91.14-.16,1.47-1.01,2.33-2.03,2.41-2.71.2-5.43.36-8.13.73-2.7.38-5.37.95-8.04,1.54-1.08.24-2.13.72-3.19,1.11-.19.07-.35.22-.49.55.34-.01.67-.03,1.01-.03,5.37-.12,10.75-.17,16.11.53,1.21.16,2.32.54,3.45,1.13,1.75.92,2.14,2.56,1.28,2.64-.62.06-1.45-.46-2.09-.61-1.83-.43-3.36-.06-5.02.39-3.17.85-5.99,2.35-8.65,4.65-.2.17-.43.3-.65.43-.05.03-.14,0-.26-.02Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M110.08,8.74c.18.26-.34,1.28-1.37,2.74-.98,1.39-2.4,3.08-3.83,4.56-3.09,3.19-6.06,4.92-9.19,6.39-5.14,2.41-3.75,1.79-9.15,3.56-10.33,3.39-12.33,10.51-22.65,13.46-5.5,1.57-7.2,1.05-3.41-.78,17.41-8.41,13.36-11.92,24.36-15.55,5.41-1.79,5.43-1.22,10.63-3.72,4.71-2.27,4.38-1.82,9.31-5.87,1.46-1.19,2.89-2.36,5.29-4.79v.02Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M112.44,64.79c.51,6.44-5.48,13.57-12.18,11.69-7.7-2.17-8.85-13.05-3.46-18.23,5.81-6.18,15.25-1.88,15.63,6.34v.2ZM107.7,65.88c-.16-3.47-1.69-8.81-5.74-8.16-5.21,2.1-5.25,12.66-.96,16.3,4.53,2.87,7-4.02,6.71-7.9v-.25Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M81.38,52.2c-.71.2-2.63,1-3.4,1.58-.5.36-1.01.77-1.47,1.2s-.88.89-1.2,1.36c-.56.87-.85,2.42-1.01,4.01s-.21,3.2-.3,4.21c-.09.91-.11,2.12-.07,3.34s.14,2.43.27,3.34c.11.75.21,1.36.39,1.96s.44,1.18.87,1.86c.46.73.47,1.13.15,1.37s-.96.29-1.82.31c-1.01.03-.57.02-.7.02s-.85,0-4.18.05c-.38,0-.55-.23-.53-.55s.22-.72.58-1.05c.44-.4.7-.7.85-1.04s.18-.73.17-1.32c-.04-2.47-.05-4.95-.07-7.43s-.04-4.95-.11-7.42c-.05-1.72-.15-3.43-.26-5.14s-.25-3.43-.37-5.14c-.02-.34-.08-.69-.14-1.05s-.14-.74-.21-1.16c-1.35.25-2.71.32-3.97.06s-2.42-.84-3.38-1.87c-.58-.62-.11-.59.81-.47s2.32.32,3.59.04,2.59-.7,3.83-1.19,2.43-1.08,3.59-1.71c1.7-.93,3.45-1.72,5.25-2.36s3.65-1.14,5.53-1.49c2.31-.35,4.45-.13,6.52.21s4.07.79,6.09.93c.66.04,1.75.02,2.83-.04s2.15-.17,2.78-.3c.49-.1.48.01.31.18s-.51.39-.67.52c-.29.23-.65.44-1.03.63s-.79.36-1.18.5c-1.93.82-4.31.81-6.66.62s-4.64-.57-6.4-.49c-1.87.08-3.38.43-4.77.92s-2.67,1.11-4.09,1.72c-.84.36-1.7.86-2.32,1.51s-1.03,1.45-.96,2.43c.07,1.15.08,2.1.07,3.09s-.03,2.28-.03,3.53c.18-.09.59-.47.93-.68.58-.34,1.34-.71,1.83-.91.56-.22,1.97-.77,2.9-.79.61-.01,1.51,2.02,1.16,2.12Z"
			/>
			<use
				width="10.15"
				height="36.97"
				transform="translate(157.56 39.77)"
				xlinkHref="#New_Symbol"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M164.65,91.93c-.18.74-.59,1.31-1.22,1.73-.64.42-1.35.62-2.12.62-.51,0-.99-.09-1.44-.26-.45-.17-.8-.4-1.06-.68-.26-.28-.43-.55-.52-.8-.09-.26-.15-.55-.18-.88h1.23c0,.5.21.88.62,1.17.41.29.9.43,1.46.43.44,0,.84-.09,1.22-.27.37-.18.64-.43.8-.76.04-.16.07-.29.1-.41.03-.11.05-.21.06-.31v-1.67c-.25.4-.59.71-1.02.92-.43.21-.89.31-1.37.31-.45,0-.88-.08-1.29-.25s-.77-.41-1.07-.73c-.3-.32-.52-.68-.67-1.09-.15-.41-.22-.82-.22-1.23,0-.57.13-1.12.38-1.65.26-.53.61-.97,1.07-1.32.55-.37,1.14-.56,1.78-.56.14,0,.29.01.45.04.4.04.78.18,1.13.43.35.25.63.56.85.94v-1.23h1.06v7.49ZM163.41,88.85c.11-.36.17-.71.17-1.06,0-.54-.13-1.02-.39-1.45-.26-.42-.66-.73-1.19-.92-.25-.05-.48-.07-.67-.07h-.18c-.08.02-.28.06-.58.13s-.61.33-.94.79c-.33.46-.49.98-.49,1.55,0,.34.07.68.22,1.01.14.33.36.62.64.86.42.31.89.46,1.4.46.43,0,.83-.11,1.2-.34s.64-.55.82-.96Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M177.84,88.67c-.08.64-.32,1.18-.71,1.6-.39.42-.79.67-1.2.74-.42.07-.72.1-.9.1-.54,0-1.04-.11-1.48-.34s-.79-.58-1.04-1.04c-.12-.32-.2-.62-.22-.92v-4.41h1.19v3.84c0,.5.14.95.43,1.32.29.38.67.57,1.14.57h.17c.39-.05.73-.21,1.01-.5s.43-.62.43-1v-4.22h1.19v4.27Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M187.47,82.12c-.09.02-.16.03-.21.03-.22,0-.41-.08-.55-.25s-.22-.36-.22-.58c0-.14.03-.26.09-.37s.17-.2.32-.27c.07-.02.14-.04.23-.07.09-.03.17-.03.25-.01.21.03.38.12.5.27.12.15.18.32.18.5,0,.39-.2.64-.59.76ZM187.84,90.91h-1.16v-6.47h1.16v6.47Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M200.43,85.38h-1.16v5.53h-1.13v-5.53h-1.02v-.9h1.02v-2.62h1.13v2.62h1.16v.9Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M214.31,90.91h-1.05v-1.29c-.23.46-.59.82-1.06,1.08-.48.26-.98.39-1.5.39-.26,0-.51-.03-.76-.08s-.55-.2-.92-.43-.71-.63-1-1.18-.44-1.14-.44-1.77c0-.52.11-1.03.33-1.53.16-.31.42-.66.77-1.06s.88-.66,1.55-.78c.07,0,.16,0,.24-.01.09,0,.16-.01.2-.01.52,0,1,.12,1.43.35.43.23.8.57,1.09,1.02v-1.2h1.11v6.51ZM213,88.84c.14-.36.21-.73.21-1.13,0-.53-.12-1-.36-1.41-.24-.41-.61-.72-1.09-.92-.17-.05-.37-.08-.61-.08-.24,0-.38-.01-.42-.01-.6.09-1.08.39-1.44.88-.36.49-.54,1.03-.54,1.63,0,.37.07.7.2,1.01s.38.6.73.89c.35.29.79.43,1.31.43.44,0,.83-.11,1.19-.33s.63-.54.82-.95Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M226.56,84.68l-.67.92c-.24-.21-.5-.32-.76-.32-.36,0-.7.18-.99.54s-.5.75-.59,1.18v3.91h-1.13v-6.45h1.05v1.58c.12-.43.34-.82.65-1.17.31-.35.67-.55,1.09-.61.48,0,.94.14,1.36.42Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M237.16,85.46l-.95.55c-.07-.26-.26-.48-.57-.65-.3-.17-.63-.26-.97-.26-.24,0-.46.05-.64.15-.19.1-.31.23-.37.39-.06.16-.09.3-.09.4,0,.24.14.48.42.72l2.18.77c.33.14.57.35.74.62s.25.57.25.88c0,.41-.12.8-.36,1.16-.24.36-.56.62-.97.76-.15.04-.32.07-.51.1s-.37.04-.53.04c-.52,0-1.01-.11-1.46-.32-.45-.21-.84-.53-1.15-.95l.98-.66c.15.31.37.56.67.75.3.19.62.28.97.28s.59-.07.79-.21c.2-.14.33-.27.39-.38.06-.11.08-.23.08-.35,0-.2-.07-.38-.2-.54-.13-.16-.31-.29-.55-.37-.45-.13-.92-.28-1.41-.43s-.84-.39-1.06-.69c-.27-.35-.41-.71-.41-1.11,0-.61.2-1.05.6-1.33.4-.28.75-.44,1.06-.5.31-.06.67-.08,1.08-.08.45.04.83.16,1.13.36.31.21.59.5.85.9Z"
			/>
			<use
				width="10.05"
				height="28.47"
				transform="translate(81.93 48.32)"
				xlinkHref="#Fiorelli_i"
			/>
			<use
				width="10.05"
				height="28.47"
				transform="translate(182.72 48.32)"
				xlinkHref="#Fiorelli_i"
			/>
			<use
				width="10.15"
				height="36.97"
				transform="translate(170.87 39.67)"
				xlinkHref="#New_Symbol"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M119.69,56.95c3.77-2.81,13.08-2.1,12.52,3.6-.09.95-.54,1.94-1.14,2.7-.71.83-1.66,1.37-2.57,1.97,8.7,4.95,6.96,17.91,15.53,22.79,2,1.03,4.66,1.48,6.51.13.24-.22.61-.68.5-1s-.68-.48-1.09.09c-.25.34-.62.2-.78-.12s-.11-.84.49-1.25c.84-.57,2.11-.16,2.45.83.33,1.43-.85,2.7-2.05,3.28-2.72,1.64-6.49.86-8.87-.73-5.53-3.74-7.63-11.02-10.48-16.71-1.65-3.56-6.55-7.83-9.92-3.74-.67.91-1.11,2.23-1.3,3.33-.24,1.33-.14,2.27.17,2.94s1.28,1.61-1.67,1.68c-.74.02-2.15-.03-3.46,0-.46,0-.93-.56.05-1.59.44-.46,1.26-1.39,1.78-3.48,1.2-4.79,1.17-8.61-.72-12.52-.69-1.43-1.85-2.45-2.76-3.17-1.48-1.17,1.52-.45,2.31-.04.41.21,1.53.82,2.27,1.31s1.44.36,2.23-.27ZM120.14,61.3c-1.1,5.83,10.96,2.2,8.01-2.14-1.93-2.84-7.54-.34-8.01,2.14Z"
			/>
			<path
				strokeWidth="0px"
				fillRule="evenodd"
				d="M146.76,76.69h-.49c-2.63,0-4.84-.93-6.63-2.77-1.79-1.85-2.68-4.3-2.68-7.36s.88-5.64,2.65-7.75c.95-1.14,2.08-2,3.4-2.56,1.32-.56,2.6-.85,3.84-.85h.96c1.86,0,3.5.65,4.95,1.94.71.64,1.29,1.45,1.73,2.44.44.99.66,1.83.66,2.53v.42c0,1.17-.7,2.84-2.17,3.17-.82.18-2.53.33-5.13.46-2.61.13-5.22-.02-5.72.19-.79.33-1.18.56-1.18,1.87s.57,2.51,1.72,3.61,2.85,1.57,4.23,1.57,3.41-.26,4.94-.92,2.43-.98,2.7-.98.4.23.4.69c0,.88-1.08,1.9-3.23,3.07-1.53.83-3.17,1.25-4.92,1.25ZM148.85,63.73c3.68-.12,1.18-4.82-1.02-5.51-2.62-.82-5.79,1.63-6.34,4.06-.28,1.24.97,1.46,2,1.52,1.59.09,3.72,0,5.19-.06.04,0,.12,0,.16,0Z"
			/>
		</svg>
	);
};

export default FullLogo;
