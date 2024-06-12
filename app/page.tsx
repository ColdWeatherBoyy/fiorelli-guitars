"use client";

import { useContext, useEffect, useState } from "react";
import Welcome from "./components/pages/Welcome";
import Homepage from "./homepage/page";
import { BackgroundImageContext } from "./providers/BackgroundImageProvider";
import { backgroundImagesLarge, backgroundImagesSmall } from "./utilities/constants";
import { useIsSmallScreen } from "./utilities/hooks";
import { HomepageState } from "./utilities/types";

export default function Home() {
	const isSmallScreen = useIsSmallScreen();
	const [homepageState, setHomepageState] = useState<HomepageState>(
		HomepageState.welcome
	);
	// // 	localStorage.getItem("visited") ? HomepageState.entered : HomepageState.welcome
	// // );
	const { currentImage, setCurrentImage } = useContext(BackgroundImageContext);

	const handleEnter = () => {
		setHomepageState(HomepageState.entering);
		localStorage.setItem("visited", "true");
		setTimeout(() => {
			setCurrentImage(
				isSmallScreen ? backgroundImagesSmall.HB_Detail_1 : backgroundImagesLarge.WS_Shop
			);
			setHomepageState(HomepageState.entered);
		}, 1000);
	};

	useEffect(() => {
		if (homepageState === HomepageState.entered) {
			if (isSmallScreen && currentImage !== backgroundImagesSmall.WS_Neck_1) {
				setCurrentImage(backgroundImagesSmall.HB_Detail_1);
			} else if (!isSmallScreen && currentImage !== backgroundImagesLarge.WS_Shop) {
				setCurrentImage(backgroundImagesLarge.WS_Shop);
			}
		}
	}, [isSmallScreen, homepageState, currentImage]);

	return (
		<>
			{homepageState !== HomepageState.entered ? (
				<Welcome
					homepageState={homepageState}
					currentImage={currentImage}
					handleEnter={handleEnter}
				/>
			) : (
				<Homepage homepageState={homepageState} currentImage={currentImage} />
			)}
		</>
	);
}
