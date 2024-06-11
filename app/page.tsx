"use client";

import { useEffect, useState } from "react";
import BackgroundImage from "./components/BackgroundImage";
import CoverPageTransition from "./components/CoverPageTransition";
import OpenPageTransition from "./components/OpenPageTransition";
import { playfair_display } from "./style/fonts";
import { backgroundPicturesLarge, backgroundPicturesSmall } from "./utilities/constants";
import { useIsSmallScreen } from "./utilities/hooks";
import { Picture } from "./utilities/types";

enum PageState {
	welcome = "welcome",
	entering = "entering",
	entered = "entered",
}

export default function Home() {
	const isSmallScreen = useIsSmallScreen();
	const [pageState, setPageState] = useState<PageState>(PageState.welcome);
	const [currentPicture, setCurrentPicture] = useState<Picture>(
		backgroundPicturesLarge.J_SP_Hold
	);

	const handleEnter = () => {
		setPageState(PageState.entering);
		setTimeout(() => {
			// detect size of screen for media query

			setCurrentPicture(
				isSmallScreen
					? backgroundPicturesSmall.WS_Neck_1
					: backgroundPicturesLarge.WS_Shop
			);
			setPageState(PageState.entered);
		}, 1000);
	};

	useEffect(() => {
		if (pageState === PageState.entered) {
			if (isSmallScreen && currentPicture !== backgroundPicturesSmall.WS_Neck_1) {
				setCurrentPicture(backgroundPicturesSmall.WS_Neck_1);
			} else if (!isSmallScreen && currentPicture !== backgroundPicturesLarge.WS_Shop) {
				setCurrentPicture(backgroundPicturesLarge.WS_Shop);
			}
		}
	}, [isSmallScreen, pageState, currentPicture]);

	return (
		<>
			{pageState !== PageState.entered ? (
				<div className="h-screen w-full flex justify-center items-center">
					<BackgroundImage src={currentPicture.src} alt={currentPicture.alt} />
					<div className="z-20 rounded-md bg-zinc-100/40 shadow shadow-zinc-300 backdrop-blur-md p-4 hover:transform hover:shadow-md hover:shadow-zinc-300 hover:scale-105 hover:cursor-pointer active:scale-[99%] active:shadow-inner active:shadow-zinc-300 transition-all ease-in-out duration-200">
						<div
							className={`${playfair_display.className} text-6xl md:text-8xl text-shadow-white`}
							onClick={handleEnter}
						>
							Welcome
						</div>
					</div>
					{pageState === PageState.entering && <CoverPageTransition cover={true} />}
				</div>
			) : (
				<>
					{pageState === PageState.entered && <OpenPageTransition />}
					<div className="h-screen w-full flex justify-center items-center">
						<BackgroundImage src={currentPicture.src} alt={currentPicture.alt} />
					</div>
				</>
			)}
		</>
	);
}
