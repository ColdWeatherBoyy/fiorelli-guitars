"use client";

import {
	activeDarkLogoStyle,
	activeLightLogoStyle,
	defaultDarkLogoStyle,
	defaultLightLogoStyle,
	hoverDarkLogoStyle,
	hoverLightLogoStyle,
} from "@/app/style/general";
import { useDarkMode, useScreenSize } from "@/app/utilities/hooks";
import Link from "next/link";
import { useState } from "react";
import IGLogo from "../../SVGs/IGLogo";
import SmallLogo from "../../SVGs/SmallLogo";
import { ScreenSize } from "@/app/utilities/types";

const Footer = () => {
	const isDarkMode = useDarkMode();
	const screenSize = useScreenSize();
	const [darkLogoStyle, setDarkLogoStyle] = useState(defaultDarkLogoStyle);
	const [lightLogoStyle, setLightLogoStyle] = useState(defaultLightLogoStyle);
	const [darkIGLogoStyle, setDarkIGLogoStyle] = useState(defaultDarkLogoStyle);
	const [lightIGLogoStyle, setLightIGLogoStyle] = useState(defaultLightLogoStyle);

	const handleLogoHover = (hover: boolean) => {
		if (hover) {
			setDarkLogoStyle(hoverDarkLogoStyle);
			setLightLogoStyle(hoverLightLogoStyle);
		} else {
			setDarkLogoStyle(defaultDarkLogoStyle);
			setLightLogoStyle(defaultLightLogoStyle);
		}
	};

	const handleLogoClick = (click: boolean) => {
		if (click) {
			setDarkLogoStyle(activeDarkLogoStyle);
			setLightLogoStyle(activeLightLogoStyle);
		} else {
			setDarkLogoStyle(defaultDarkLogoStyle);
			setLightLogoStyle(defaultLightLogoStyle);
		}
	};

	const handleIGLogoHover = (hover: boolean) => {
		if (hover) {
			setDarkIGLogoStyle(hoverDarkLogoStyle);
			setLightIGLogoStyle(hoverLightLogoStyle);
		} else {
			setDarkIGLogoStyle(defaultDarkLogoStyle);
			setLightIGLogoStyle(defaultLightLogoStyle);
		}
	};

	const handleIGLogoClick = (click: boolean) => {
		if (click) {
			setDarkIGLogoStyle(activeDarkLogoStyle);
			setLightIGLogoStyle(activeLightLogoStyle);
		} else {
			setDarkIGLogoStyle(defaultDarkLogoStyle);
			setLightIGLogoStyle(defaultLightLogoStyle);
		}
	};

	return (
		<div
			className={`z-10 h-10 lg:h-16 flex items-center justify-evenly gap-10 bottom-0 p-8 bg-gradient-to-br from-cyan-50/90 to-zinc-300/90 dark:from-cyan-950/80 dark:to-zinc-800/80 backdrop-blur w-dvw rounded-sm rounded-b-0 shadow-sm shadow-zinc-600/60`}
		>
			<Link
				href="/"
				onMouseEnter={() => handleLogoHover(true)}
				onMouseLeave={() => handleLogoHover(false)}
				onMouseDown={() => handleLogoClick(true)}
				onMouseUp={() => handleLogoClick(false)}
				onTouchStart={() => handleLogoClick(true)}
				onTouchEnd={() => handleLogoClick(false)}
			>
				<SmallLogo
					width={50}
					height={50}
					color={isDarkMode ? darkLogoStyle.color : lightLogoStyle.color}
					className={` mb-1 ${
						isDarkMode ? darkLogoStyle.translate : lightLogoStyle.translate
					}`}
				/>
			</Link>

			<Link
				href="https://www.instagram.com/fiorelliguitars"
				onMouseEnter={() => handleIGLogoHover(true)}
				onMouseLeave={() => handleIGLogoHover(false)}
				onMouseDown={() => handleIGLogoClick(true)}
				onMouseUp={() => handleIGLogoClick(false)}
				onTouchStart={() => handleIGLogoClick(true)}
				onTouchEnd={() => handleIGLogoClick(false)}
			>
				<IGLogo
					width={30}
					height={30}
					color={isDarkMode ? darkIGLogoStyle.color : lightIGLogoStyle.color}
					className={`${
						isDarkMode ? darkIGLogoStyle.translate : lightIGLogoStyle.translate
					}`}
				/>
			</Link>
		</div>
	);
};

export default Footer;
