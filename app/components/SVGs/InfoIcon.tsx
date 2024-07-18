interface InfoIconProps {
	width?: number;
	height?: number;
	className?: string;
}

// Thanks to https://iconmonstr.com/info-thin-svg/

const InfoIcon: React.FC<InfoIconProps> = ({ width = 25, height = 25 }) => {
	return (
		<svg
			fill="currentColor"
			width={width}
			height={height}
			xmlns="http://www.w3.org/2000/svg"
			fillRule="evenodd"
			clipRule="evenodd"
		>
			<path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z" />
		</svg>
	);
};

export default InfoIcon;
