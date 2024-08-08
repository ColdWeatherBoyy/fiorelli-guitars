"use client";

import { playfair_display } from "@/app/style/fonts";
import Link from "next/link";
import { FC } from "react";
import { useFormStatus } from "react-dom";

interface CardButtonLinkProps {
	text: string;
	href?: string;
	handleClick?: () => void;
}

const CardButtonLink: FC<CardButtonLinkProps> = ({ text, href, handleClick }) => {
	const { pending } = useFormStatus();

	const content = (
		<div
			className={`${
				playfair_display.className
			} text-base md:text-lg text-center w-fit py-1 px-1.5 rounded-sm backdrop-blur-md bg-cyan-50 dark:bg-zinc-700 border border-zinc-400 dark:border-cyan-800 shadow-sm shadow-zinc-600 dark:shadow-zinc-800 transition-all ease-in-out duration-200 ${
				pending
					? "opacity-50 cursor-not-allowed"
					: "hover:shadow-md active:shadow-inner hover:shadow-zinc-700 dark:hover:shadow-cyan-950 active:shadow-zinc-600 dark:active:shadow-cyan-950 active:shadow-sm hover:transform hover:translate-x-[3px] hover:translate-y-[-3px] active:translate-x-[0px] active:translate-y-[0px] hover:cursor-pointer"
			}`}
		>
			{text}
		</div>
	);
	return (
		<>
			{href ? (
				<Link href={href}>{content}</Link>
			) : (
				<button onClick={handleClick} disabled={pending} className="self-center">
					{content}
				</button>
			)}
		</>
	);
};

export default CardButtonLink;
