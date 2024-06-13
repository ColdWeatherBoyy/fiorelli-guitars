import { playfair_display } from "@/app/style/fonts";
import { FC } from "react";

interface TextCardProps {
	title?: string;
	subtitle?: string;
	text?: string;
	clickable?: boolean;
	handleClick: () => void;
}

const TextCard: FC<TextCardProps> = ({
	title,
	subtitle,
	text,
	clickable,
	handleClick,
}) => (
	<div
		className={`rounded-md bg-zinc-100/40 shadow shadow-zinc-300 backdrop-blur-md p-4 hover:transform hover:shadow-md hover:shadow-zinc-300 hover:scale-105 hover:cursor-pointer active:scale-[99%] active:shadow-inner active:shadow-zinc-300 transition-all ease-in-out duration-200`}
	>
		<div
			className={`${playfair_display.className} text-6xl md:text-8xl text-shadow-white dark:text-shadow-black`}
			onClick={handleClick}
		>
			{text}
		</div>
	</div>
);

export default TextCard;
