"use client";

import Link from "next/link";
import { useState } from "react";
import FullLogo from "../SVGs/FullLogo";
import HeaderLink from "../components/HeaderLink";
import { useSmallScreenStatus } from "@/app/utilities/hooks";
import SmallLogo from "../SVGs/SmallLogo";

const Header = () => {
	const [logoColor, setLogoColor] = useState("black");
	const isSmallScreen = useSmallScreenStatus();

	return (
		<div
			className={`z-10 h-16 md:h-28 fixed flex items-center justify-center md:flex-none md:justify-start top-0 left:0 p-6 bg-gradient-to-br from-cyan-50/80 to-zinc-300/80 dark:from-cyan-950/80 dark:to-zinc-800/80 backdrop-blur w-screen rounded-sm shadow-sm`}
		>
			<div className="flex gap-8 items-center">
				<Link
					href="/"
					className={`mb-5 -mr-4`}
					onMouseEnter={() => setLogoColor("#155e75")}
					onMouseLeave={() => setLogoColor("black")}
				>
					{isSmallScreen ? (
						<SmallLogo color={logoColor} />
					) : (
						<FullLogo color={logoColor} />
					)}
				</Link>
				<HeaderLink href="/about" text="About" />
				<HeaderLink href="/gallery" text="Gallery" />
				<HeaderLink href="/contact" text="Contact" />
			</div>
		</div>
	);
};

export default Header;
