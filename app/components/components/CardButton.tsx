import { playfair_display } from "@/app/style/fonts";
import { TextSize } from "@/app/utilities/types";
import { FC } from "react";

interface CardButtonProps {
	text: string;
	size: TextSize;
	handleClick: () => void;
}

const CardButton: FC<CardButtonProps> = ({ text, size, handleClick }) => {
	const textClass =
		size === TextSize.small
			? { mobile: "text-lg", desktop: "md:text-xl" }
			: size === TextSize.medium
			? { mobile: "text-2xl", desktop: "md:text-4xl" }
			: { mobile: "text-6xl", desktop: "md:text-8xl" };
	return (
		<div className="text-center w-fit rounded-sm bg-gradient-to-br from-cyan-200/70 to-zinc-300/70 shadow shadow-cyan-100/80 backdrop-blur-md p-2 hover:transform hover:shadow-md hover:shadow-cyan-700/80 hover:scale-105 hover:cursor-pointer active:scale-[99%] active:shadow-inner active:shadow-zinc-300 transition-all ease-in-out duration-200">
			<div
				className={`${playfair_display.className} ${textClass.mobile} ${textClass.desktop} text-shadow-white dark:text-shadow-black`}
				onClick={handleClick}
			>
				{text}
			</div>
		</div>
	);
};

export default CardButton;
