import { playfair_display } from "@/app/style/fonts";
import Link from "next/link";
import { FC } from "react";

interface HeaderLinkProps {
	href: string;
	text: string;
	isMobile?: boolean;
}

const HeaderLink: FC<HeaderLinkProps> = ({ href, text, isMobile }) => {
	return (
		<Link
			href={href}
			className={`${playfair_display.className} text-2xl md:text-3xl ${
				isMobile
					? "active:text-cyan-800 active:transform active:scale-[90%] transition duration-100"
					: "hover:underline hover:text-cyan-800 dark:hover:text-cyan-500 hover:transform hover:scale-[103%] active:text-cyan-900 active:transform active:scale-[97%] transition-transform duration-200"
			}`}
		>
			{text}
		</Link>
	);
};

export default HeaderLink;
