import { playfair_display } from "@/app/style/fonts";
import Link from "next/link";
import { FC } from "react";

interface HeaderLinkProps {
	href: string;
	text: string;
}

const HeaderLink: FC<HeaderLinkProps> = ({ href, text }) => {
	return (
		<Link
			href={href}
			className={`${playfair_display.className} text-2xl md:text-3xl hover:underline hover:text-cyan-800 hover:transform hover:scale-[103%]`}
		>
			{text}
		</Link>
	);
};

export default HeaderLink;
