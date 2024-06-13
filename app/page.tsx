"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import WelcomeImage from "../WelcomeImage";
import CoverPageTransition from "./components/transitions/CoverPageTransition";
import { playfair_display } from "./style/fonts";
import { backgroundImageCarousel } from "./utilities/constants";
import { WelcomeState } from "./utilities/types";
import OpenPageTransition from "./components/transitions/OpenPageTransition";
import { WelcomeStateContext } from "./context/WelcomeStateContext";

export default function Home() {
	const { welcomeState, setWelcomeState } = useContext(WelcomeStateContext);
	const router = useRouter();

	const handleEnter = () => {
		setWelcomeState(WelcomeState.entering);
		document.cookie = "visited";
		setTimeout(() => {
			router.push("/home");
		}, 1000);
	};

	return (
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
			{welcomeState === WelcomeState.entering && <CoverPageTransition cover={true} />}
		</>
	);
}
