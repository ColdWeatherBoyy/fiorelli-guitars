import { playfair_display } from "@/app/style/fonts";
import { TextSize } from "@/app/utilities/types";
import Link from "next/link";
import { FC } from "react";

interface CardButtonLinkProps {
	text: string;
	size: TextSize;
	hrefIfLink?: string;
	handleClick?: () => void;
}

const CardButtonLink: FC<CardButtonLinkProps> = ({
	text,
	size,
	hrefIfLink,
	handleClick,
}) => {
	const textClass =
		size === TextSize.small
			? { mobile: "text-lg", desktop: "md:text-xl" }
			: size === TextSize.medium
			? { mobile: "text-2xl", desktop: "md:text-4xl" }
			: { mobile: "text-6xl", desktop: "md:text-8xl" };

	const classStyle = `${playfair_display.className} ${textClass.mobile} ${textClass.desktop} text-center w-fit p-3 rounded-sm backdrop-blur-md bg-gradient-to-br from-cyan-50/80 to-zinc-300/80 dark:from-cyan-950/80 dark:to-zinc-800/80 shadow-sm hover:shadow active:shadow-inner shadow-cyan-300/80 dark:shadow-cyan-700/80 hover:shadow-cyan-600/80 dark:hover:shadow-cyan-800/80 active:shadow-cyan-600/80 dark:active:shadow-cyan-800/80 active:shadow-sm hover:transform hover:translate-x-[3px] hover:translate-y-[-3px] hover:scale-[102%] active:scale-[99%] active:translate-x-[0px] active:translate-y-[0px] hover:cursor-pointer active:scale-[99%] transition-all ease-in-out duration-200`;
	return (
		<>
			{hrefIfLink ? (
				<Link href={hrefIfLink} className={classStyle}>
					{text}
				</Link>
			) : (
				<div className={`${classStyle}`} onClick={handleClick}>
					{text}
				</div>
			)}
		</>
	);
};

export default CardButtonLink;