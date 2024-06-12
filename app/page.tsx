"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import CoverPageTransition from "./components/transitions/CoverPageTransition";
import { BackgroundImageContext } from "./providers/BackgroundImageProvider";
import { playfair_display } from "./style/fonts";
import { backgroundImagesLarge, backgroundImagesSmall } from "./utilities/constants";
import { useIsSmallScreen } from "./utilities/hooks";

export default function Home() {
	const isSmallScreen = useIsSmallScreen();
	const router = useRouter();
	const { currentImage, setCurrentImage } = useContext(BackgroundImageContext);
	const [isClicked, setIsClicked] = useState(false);

	const handleEnter = () => {
		setIsClicked(true);
		localStorage.setItem("visited", "true");
		setTimeout(() => {
			setCurrentImage(
				isSmallScreen ? backgroundImagesSmall.HB_Detail_1 : backgroundImagesLarge.WS_Shop
			);
			router.push("/homepage");
		}, 1000);
	};

	return (
		<>
			<div className="z-20 rounded-md bg-zinc-100/40 shadow shadow-zinc-300 backdrop-blur-md p-4 hover:transform hover:shadow-md hover:shadow-zinc-300 hover:scale-105 hover:cursor-pointer active:scale-[99%] active:shadow-inner active:shadow-zinc-300 transition-all ease-in-out duration-200">
				<div
					className={`${playfair_display.className} text-6xl md:text-8xl text-shadow-white dark:text-shadow-black`}
					onClick={handleEnter}
				>
					Welcome
				</div>
			</div>
			{isClicked && <CoverPageTransition cover={true} />}
		</>
	);
}
