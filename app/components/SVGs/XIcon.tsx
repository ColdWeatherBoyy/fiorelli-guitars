interface XIconProps {
	width?: number;
	height?: number;
	className?: string;
}

// Thanks to https://iconmonstr.com/x-mark-circle-thin-svg/

const XIcon: React.FC<XIconProps> = ({ width = 24, height = 24 }) => {
	return (
		<svg
			fill="currentColor"
			width={width}
			height={height}
			xmlns="http://www.w3.org/2000/svg"
			fillRule="evenodd"
			clipRule="evenodd"
		>
			<path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z" />
		</svg>
	);
};

export default XIcon;
