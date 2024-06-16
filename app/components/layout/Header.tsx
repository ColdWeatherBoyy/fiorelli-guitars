"use client";

import { useScreenSize } from "@/app/utilities/hooks";
import { ScreenSize } from "@/app/utilities/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FullLogo from "../SVGs/FullLogo";
import SmallLogo from "../SVGs/SmallLogo";
import HamburgerMenuButton from "../components/HamburgerMenuButton";
import HeaderLink from "../components/HeaderLink";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [hoverStyle, setHoverStyle] = useState({ color: "black", translate: "" });
	const screenSize = useScreenSize();
	const menuRef = useRef<HTMLDivElement>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);

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

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (
				menuRef.current &&
				menuButtonRef.current &&
				!menuButtonRef.current.contains(event.target as Node) &&
				!menuRef.current.contains(event.target as Node)
			) {
				console.log("here");
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, []);

	return (
		<div
			className={`z-10 h-16 md:h-28 fixed flex items-center justify-center lg:justify-start top-0 left:0 p-6 bg-gradient-to-br from-cyan-50/80 to-zinc-300/80 dark:from-cyan-950/80 dark:to-zinc-800/80 backdrop-blur w-screen rounded-sm shadow-sm`}
		>
			<div className="h-full flex gap-8 items-center justify-start sm:justify-evenly w-full lg:w-auto">
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
					<>
						<HamburgerMenuButton
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							menuButtonRef={menuButtonRef}
						/>
						<motion.div
							ref={menuRef}
							initial={false}
							animate={isOpen ? "open" : "closed"}
							variants={{
								closed: { opacity: 0, x: "-100%", display: "none" },
								open: { opacity: 1, x: 0, display: "flex" },
							}}
							transition={{ ease: "easeInOut", duration: 0.2 }}
							className="absolute rounded-sm top-16 border border-cyan-800 border-l-0 w-[40%] left-0 bg-gradient-to-b from-cyan-50 to-zinc-200 dark:bg-cyan-950 flex flex-col items-center gap-6 p-6 z-30"
							onClick={() => setIsOpen(false)}
						>
							<HeaderLink
								href="/about"
								text="About"
								isMobile={screenSize === ScreenSize.extraSmall}
							/>
							<div className="h-0.5 w-full rounded-full bg-cyan-700/30" />
							<HeaderLink
								href="/gallery"
								text="Gallery"
								isMobile={screenSize === ScreenSize.extraSmall}
							/>
							<div className="h-0.5 w-full rounded-full bg-cyan-700/30" />
							<HeaderLink
								href="/contact"
								text="Contact"
								isMobile={screenSize === ScreenSize.extraSmall}
							/>
						</motion.div>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
