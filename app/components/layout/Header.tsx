"use client";

import { useScreenSize } from "@/app/utilities/hooks";
import { ScreenSize } from "@/app/utilities/types";
import Link from "next/link";
import { useState } from "react";
import FullLogo from "../SVGs/FullLogo";
import SmallLogo from "../SVGs/SmallLogo";
import HeaderLink from "../components/HeaderLink";
import HamburgerMenu from "../components/HamburgerMenu";

const Header = () => {
	const [hoverStyle, setHoverStyle] = useState({ color: "black", translate: "" });
	const screenSize = useScreenSize();

	const handleHover = (hover: boolean) => {
		if (hover) {
			setHoverStyle({
				color: "#155e75",
				translate: "transform scale-[103%]",
			});
		} else {
			setHoverStyle({ color: "black", translate: "" });
		}
	};

	return (
		<div
			className={`z-10 h-16 md:h-28 fixed flex items-center justify-center lg:justify-start top-0 left:0 p-6 bg-gradient-to-br from-cyan-50/80 to-zinc-300/80 dark:from-cyan-950/80 dark:to-zinc-800/80 backdrop-blur w-screen rounded-sm shadow-sm`}
		>
			<div className="flex gap-8 items-center justify-start sm:justify-evenly w-full lg:w-auto">
				<Link
					href="/"
					className={`${screenSize === ScreenSize.extraSmall ? "mb-2" : "mb-4"}  -mr-4`}
					onMouseEnter={() => handleHover(true)}
					onMouseLeave={() => handleHover(false)}
				>
					{screenSize === ScreenSize.small || screenSize === ScreenSize.extraSmall ? (
						<SmallLogo color={hoverStyle.color} className={hoverStyle.translate} />
					) : (
						<FullLogo color={hoverStyle.color} className={hoverStyle.translate} />
					)}
				</Link>
				{screenSize !== ScreenSize.extraSmall ? (
					<>
						<HeaderLink href="/about" text="About" />
						<HeaderLink href="/gallery" text="Gallery" />
						<HeaderLink href="/contact" text="Contact" />
					</>
				) : (
					<HamburgerMenu />
				)}
			</div>
		</div>
	);
};

export default Header;
