"use client";

import {
	activeDarkLogoStyle,
	activeLightLogoStyle,
	defaultDarkLogoStyle,
	defaultLightLogoStyle,
	hoverDarkLogoStyle,
	hoverLightLogoStyle,
} from "@/app/style/general";
import { useDarkMode, useScreenSize } from "@/app/utilities/hooks.client";
import { ScreenSize } from "@/app/utilities/types";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import FullLogo from "../../../components/SVGs/FullLogo";
import SmallLogo from "../../../components/SVGs/SmallLogo";
import HamburgerMenuButton from "./navComponents/HamburgerMenuButton";
import HeaderMenu from "./navComponents/HeaderMenu";

interface HeaderProps {
	isMobile: boolean;
}

const Header: FC<HeaderProps> = ({ isMobile }) => {
	const screenSize = useScreenSize();
	const isDarkMode = useDarkMode();

	const [isOpen, setIsOpen] = useState(false);
	const [darkLogoStyle, setDarkLogoStyle] = useState(defaultDarkLogoStyle);
	const [lightLogoStyle, setLightLogoStyle] = useState(defaultLightLogoStyle);
	const menuRef = useRef<HTMLDivElement>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);

	const handleHover = (hover: boolean) => {
		if (hover) {
			setDarkLogoStyle(hoverDarkLogoStyle);
			setLightLogoStyle(hoverLightLogoStyle);
		} else {
			setDarkLogoStyle(defaultDarkLogoStyle);
			setLightLogoStyle(defaultLightLogoStyle);
		}
	};

	const handleClick = (click: boolean) => {
		if (click) {
			setDarkLogoStyle(activeDarkLogoStyle);
			setLightLogoStyle(activeLightLogoStyle);
		} else {
			setDarkLogoStyle(defaultDarkLogoStyle);
			setLightLogoStyle(defaultLightLogoStyle);
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

	return (
		<div
			className={`z-10 h-16 md:h-28 flex items-center justify-center lg:justify-start top-0 p-6 bg-gradient-to-br from-cyan-50/90 to-zinc-300/90 dark:from-cyan-950/90 dark:to-zinc-800/90 backdrop-blur w-dvw rounded-sm rounded-t-0 shadow-sm shadow-zinc-600/60`}
		>
			<div className="h-full flex gap-8 items-center justify-between w-full lg:w-auto">
				<Link
					href="/"
					className={`${screenSize === ScreenSize.extraSmall ? "mb-2" : "mb-4 "}  -mr-4`}
					onMouseEnter={() => handleHover(true)}
					onMouseLeave={() => handleHover(false)}
					onMouseDown={() => handleClick(true)}
					onMouseUp={() => handleClick(false)}
					onTouchStart={() => handleClick(true)}
					onTouchEnd={() => handleClick(false)}
				>
					{screenSize === ScreenSize.small || screenSize === ScreenSize.extraSmall ? (
						<SmallLogo
							color={isDarkMode ? darkLogoStyle.color : lightLogoStyle.color}
							className={isDarkMode ? darkLogoStyle.translate : lightLogoStyle.translate}
						/>
					) : (
						<FullLogo
							color={isDarkMode ? darkLogoStyle.color : lightLogoStyle.color}
							className={isDarkMode ? darkLogoStyle.translate : lightLogoStyle.color}
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
					isMobile={isMobile}
				/>
			</div>
		</div>
	);
};

export default Header;
