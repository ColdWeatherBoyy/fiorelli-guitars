import { FC } from "react";

interface CoverPageTransitionProps {
	cover: boolean;
}

const CoverPageTransition: FC<CoverPageTransitionProps> = ({ cover }) => {
	return (
		<>
			<div
				className={`absolute top-0 bg-zinc-100 w-dvw z-20 ${
					cover ? "animate-coverFromTop" : ""
				}`}
			/>
			<div
				className={`absolute bottom-0 bg-zinc-100 w-dvw z-20 ${
					cover ? "animate-coverFromBottom" : ""
				}`}
			/>
		</>
	);
};

export default CoverPageTransition;
