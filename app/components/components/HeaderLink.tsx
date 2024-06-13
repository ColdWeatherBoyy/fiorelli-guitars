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
			className="text-3xl text-shadow-white dark:text-shadow-black dark:hover:text-shadow-white hover:text-shadow-black hover:text-white dark:hover:text-black"
		>
			{text}
		</Link>
	);
};

export default HeaderLink;
