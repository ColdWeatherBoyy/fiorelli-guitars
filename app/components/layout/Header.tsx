"use client";

import { useDarkMode, useScreenSize } from "@/app/utilities/hooks";
import { ScreenSize } from "@/app/utilities/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FullLogo from "../SVGs/FullLogo";
import SmallLogo from "../SVGs/SmallLogo";
import HamburgerMenuButton from "../components/HamburgerMenuButton";
import HeaderMenu from "../components/HeaderMenu";

const Header = () => {
	const screenSize = useScreenSize();
	const isDarkMode = useDarkMode();

	const lightLogoStyle = {
		color: "black",
		translate: "",
	};
	const lightHoverLogoStyle = {
		color: "#155e75",
		translate: "transform scale-[103%]",
	};

	const darkLogoStyle = {
		color: "white",
		translate: "",
	};

	const darkHoverLogoStyle = {
		color: "#06b6d4",
		translate: "transform scale-[103%]",
	};

	const [isOpen, setIsOpen] = useState(false);
	const [darkHoverStyle, setDarkHoverStyle] = useState(darkLogoStyle);
	const [lightHoverStyle, setLightHoverStyle] = useState(lightLogoStyle);
	const menuRef = useRef<HTMLDivElement>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);

	const handleHover = (hover: boolean) => {
		if (hover) {
			setDarkHoverStyle(darkHoverLogoStyle);
			setLightHoverStyle(lightHoverLogoStyle);
		} else {
			setDarkHoverStyle(darkLogoStyle);
			setLightHoverStyle(lightLogoStyle);
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

	useEffect(() => {
		console.log(darkHoverStyle);
		console.log(lightHoverStyle);
	}, [darkHoverStyle, lightHoverStyle]);

	return (
		<div
			className={`z-10 h-16 md:h-28 fixed flex items-center justify-center lg:justify-start top-0 left:0 p-6 bg-gradient-to-br from-cyan-50/80 to-zinc-300/80 dark:from-cyan-950/80 dark:to-zinc-800/80 backdrop-blur w-screen rounded-sm shadow-sm`}
		>
			<div className="h-full flex gap-8 items-center justify-between w-full lg:w-auto">
				<Link
					href="/"
					className={`${screenSize === ScreenSize.extraSmall ? "mb-2" : "mb-4 "}  -mr-4`}
					onMouseEnter={() => handleHover(true)}
					onMouseLeave={() => handleHover(false)}
				>
					{screenSize === ScreenSize.small || screenSize === ScreenSize.extraSmall ? (
						<SmallLogo
							color={isDarkMode ? darkHoverStyle.color : lightHoverStyle.color}
							className={
								isDarkMode ? darkHoverStyle.translate : lightHoverStyle.translate
							}
						/>
					) : (
						<FullLogo
							color={isDarkMode ? darkHoverStyle.color : lightHoverStyle.color}
							className={isDarkMode ? darkHoverStyle.translate : lightHoverStyle.color}
						/>
					)}
				</Link>
				{screenSize === ScreenSize.extraSmall && (
					<HamburgerMenuButton
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						menuButtonRef={menuButtonRef}
					/>
				)}
				<HeaderMenu
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					screenSize={screenSize}
					menuRef={menuRef}
				/>
			</div>
		</div>
	);
};

export default Header;
