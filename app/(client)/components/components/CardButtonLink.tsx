"use client";

import { playfair_display } from "@/app/style/fonts";
import { TextSize } from "@/app/utilities/types";
import Link from "next/link";
import { FC } from "react";
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
	} rounded-sm backdrop-blur-md bg-cyan-50 dark:bg-zinc-700 border border-zinc-400 dark:border-cyan-800 shadow-sm shadow-zinc-600 dark:shadow-zinc-800 transition-all ease-in-out duration-200 ${
		pending
			? "opacity-50 cursor-not-allowed"
			: "hover:shadow-md active:shadow-inner hover:shadow-zinc-700 dark:hover:shadow-cyan-950 active:shadow-zinc-600 dark:active:shadow-cyan-950 active:shadow-sm hover:transform hover:translate-x-[3px] hover:translate-y-[-3px] active:translate-x-[0px] active:translate-y-[0px] hover:cursor-pointer"
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
