"use client";

import { useState } from "react";
import WelcomeImage from "../WelcomeImage";
import CoverPageTransition from "./components/transitions/CoverPageTransition";
import OpenPageTransition from "./components/transitions/OpenPageTransition";
import { playfair_display } from "./style/fonts";
import { backgroundImageCarousel } from "./utilities/constants";
import { HomepageState } from "./utilities/types";

export default function Home() {
	const [homepageState, setHomepageState] = useState<HomepageState>(
		HomepageState.welcome
	);

	const handleEnter = () => {
		setHomepageState(HomepageState.entering);
		document.cookie = "visited";
		setTimeout(() => {
			setHomepageState(HomepageState.entered);
		}, 1000);
	};

	return (
		<>
			{(homepageState === HomepageState.welcome ||
				homepageState === HomepageState.entering) && (
				<>
					<WelcomeImage
						src={backgroundImageCarousel[0].src}
						alt={backgroundImageCarousel[0].alt}
					/>
					<div className="rounded-md bg-zinc-100/40 shadow shadow-zinc-300 backdrop-blur-md p-4 hover:transform hover:shadow-md hover:shadow-zinc-300 hover:scale-105 hover:cursor-pointer active:scale-[99%] active:shadow-inner active:shadow-zinc-300 transition-all ease-in-out duration-200">
						<div
							className={`${playfair_display.className} text-6xl md:text-8xl text-shadow-white dark:text-shadow-black`}
							onClick={handleEnter}
						>
							Welcome
						</div>
					</div>
				</>
			)}
			{homepageState === HomepageState.entering && <CoverPageTransition cover={true} />}
			{homepageState === HomepageState.entered && (
				<>
					<OpenPageTransition />
					<div className="text-7xl text-black">hi</div>
				</>
			)}
		</>
	);
}
