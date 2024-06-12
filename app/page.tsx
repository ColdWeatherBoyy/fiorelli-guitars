"use client";

import { useEffect, useState } from "react";
import Homepage from "./components/pages/Homepage";
import Welcome from "./components/pages/Welcome";
import { backgroundPicturesLarge, backgroundPicturesSmall } from "./utilities/constants";
import { useIsSmallScreen } from "./utilities/hooks";
import { HomepageState, Picture } from "./utilities/types";

export default function Home() {
	const isSmallScreen = useIsSmallScreen();
	const [homepageState, setHomepageState] = useState<HomepageState>(
		// 	HomepageState.welcome
		// );
		localStorage.getItem("visited") ? HomepageState.entered : HomepageState.welcome
	);
	const [currentPicture, setCurrentPicture] = useState<Picture>(
		backgroundPicturesLarge.J_SP_Hold
	);

	const handleEnter = () => {
		setHomepageState(HomepageState.entering);
		localStorage.setItem("visited", "true");
		setTimeout(() => {
			// detect size of screen for media query
			setCurrentPicture(
				isSmallScreen
					? backgroundPicturesSmall.HB_Detail_1
					: backgroundPicturesLarge.WS_Shop
			);
			setHomepageState(HomepageState.entered);
		}, 1000);
	};

	useEffect(() => {
		if (homepageState === HomepageState.entered) {
			if (isSmallScreen && currentPicture !== backgroundPicturesSmall.WS_Neck_1) {
				setCurrentPicture(backgroundPicturesSmall.HB_Detail_1);
			} else if (!isSmallScreen && currentPicture !== backgroundPicturesLarge.WS_Shop) {
				setCurrentPicture(backgroundPicturesLarge.WS_Shop);
			}
		}
	}, [isSmallScreen, homepageState, currentPicture]);

	return (
		<>
			{homepageState !== HomepageState.entered ? (
				<Welcome
					homepageState={homepageState}
					currentPicture={currentPicture}
					handleEnter={handleEnter}
				/>
			) : (
				<Homepage homepageState={homepageState} currentPicture={currentPicture} />
			)}
		</>
	);
}
