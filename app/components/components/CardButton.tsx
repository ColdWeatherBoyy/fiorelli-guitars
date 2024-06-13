import { playfair_display } from "@/app/style/fonts";
import { TextSize } from "@/app/utilities/types";
import { FC } from "react";

interface TextButtonProps {
	text: string;
	size: TextSize;
	handleClick: () => void;
}

const TextButton: FC<TextButtonProps> = ({ text, size, handleClick }) => {
	const textClass =
		size === TextSize.small
			? { mobile: "text-2xl", desktop: "md:text-4xl" }
			: size === TextSize.medium
			? { mobile: "text-4xl", desktop: "md:text-6xl" }
			: { mobile: "text-6xl", desktop: "md:text-8xl" };
	return (
		<div className="rounded-md bg-zinc-100/40 shadow shadow-zinc-300 backdrop-blur-md p-4 hover:transform hover:shadow-md hover:shadow-zinc-300 hover:scale-105 hover:cursor-pointer active:scale-[99%] active:shadow-inner active:shadow-zinc-300 transition-all ease-in-out duration-200">
			<div
				className={`${playfair_display.className} ${textClass.mobile} ${textClass.desktop} text-shadow-white dark:text-shadow-black`}
				onClick={handleClick}
			>
				{text}
			</div>
		</div>
	);
};

export default TextButton;
