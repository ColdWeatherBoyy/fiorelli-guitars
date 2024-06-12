import { useContext, useEffect, useState } from "react";
import { Image } from "./types";
import { BackgroundImageContext } from "../providers/BackgroundImageProvider";

export const useIsSmallScreen = () => {
	const [isSmallScreen, setIsSmallScreen] = useState<boolean>(() =>
		typeof window !== "undefined" ? window.innerWidth < 768 : false
	);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return isSmallScreen;
};

export const useBackgroundImage = (largeImage: Image, smallImage: Image) => {
	const { currentImage, setCurrentImage } = useContext(BackgroundImageContext);
	const isSmallScreen = useIsSmallScreen();

	useEffect(() => {
		if (isSmallScreen && currentImage !== smallImage) {
			setCurrentImage(smallImage);
		} else if (!isSmallScreen && currentImage !== largeImage) {
			setCurrentImage(largeImage);
		}
	}, [isSmallScreen, currentImage, largeImage, smallImage]);
};
