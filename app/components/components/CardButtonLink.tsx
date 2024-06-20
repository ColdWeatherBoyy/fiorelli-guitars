"use client";

import { playfair_display } from "@/app/style/fonts";
import { TextSize } from "@/app/utilities/types";
import Link from "next/link";
import { FC, useEffect } from "react";
import { useFormStatus } from "react-dom";

interface CardButtonLinkProps {
	text: string;
	size: TextSize;
	href?: string;
	handleClick?: () => void;
}

const CardButtonLink: FC<CardButtonLinkProps> = ({ text, size, href, handleClick }) => {
	const { pending } = useFormStatus();

	const textClass =
		size === TextSize.small
			? { mobile: "text-base", desktop: "md:text-lg" }
			: size === TextSize.medium
			? { mobile: "text-2xl", desktop: "md:text-4xl" }
			: { mobile: "text-6xl", desktop: "md:text-8xl" };

	const classStyle = `${playfair_display.className} ${textClass.mobile} ${
		textClass.desktop
	} text-center w-fit ${
		size === TextSize.large ? "p-3" : "py-1 px-1.5"
	} rounded-sm backdrop-blur-md bg-gradient-to-br from-cyan-50/80 to-zinc-100/80 dark:from-cyan-950/90 dark:to-zinc-800/90 shadow-sm shadow-zinc-600/60 transition-all ease-in-out duration-200 ${
		pending
			? "opacity-50 cursor-not-allowed"
			: "hover:shadow-md active:shadow-inner hover:shadow-cyan-600/80 dark:hover:shadow-cyan-800/80 active:shadow-cyan-600/80 dark:active:shadow-cyan-800/80 active:shadow-sm hover:transform hover:translate-x-[3px] hover:translate-y-[-3px] hover:scale-[102%] active:scale-[99%] active:translate-x-[0px] active:translate-y-[0px] hover:cursor-pointer active:scale-[99%]"
	}`;
	return (
		<>
			{href ? (
				<Link href={href} className={classStyle}>
					{text}
				</Link>
			) : (
				<button
					className={`self-center ${classStyle}`}
					onClick={handleClick}
					disabled={pending}
				>
					{text}
				</button>
			)}
		</>
	);
};

export default CardButtonLink;
