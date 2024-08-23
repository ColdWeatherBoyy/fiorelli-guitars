// Thanks to SVGRepo https://www.svgrepo.com/svg/474617/loading

interface LoadingIconProps {
	width?: number;
	height?: number;
	className?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ width = 50, height = 50 }) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			className="animate-spin"
		>
			<path
				d="M12 1V5"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
				className="animate-fadeInOne"
			/>
			<path
				d="M19.4246 18.9246L16.5961 16.0962"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
			/>
			<path
				d="M22.5 11.5L18.5 11.5"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
			/>
			<path d="M12 18V22" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
			<path
				d="M7.40381 6.90381L4.57538 4.07538"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
			/>
			<path
				d="M5.5 11.5L1.5 11.5"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
			/>
			<path
				d="M7.40381 16.0962L4.57538 18.9246"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default LoadingIcon;
