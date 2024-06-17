import { useEffect, useState } from "react";
import { ScreenSize } from "./types";

export const useScreenSize = () => {
	const [screenSize, setScreenSize] = useState<ScreenSize | null>(() => null);

	useEffect(() => {
		const extraSmallQuery = window.matchMedia("(max-width: 639px)");
		const smallQuery = window.matchMedia("(min-width:640px) and (max-width: 767px)");
		const mediumQuery = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
		const largeQuery = window.matchMedia("(min-width: 1024px)");

		const updateScreenSize = () => {
			if (extraSmallQuery.matches) {
				setScreenSize(ScreenSize.extraSmall);
			} else if (smallQuery.matches) {
				setScreenSize(ScreenSize.small);
			} else if (mediumQuery.matches) {
				setScreenSize(ScreenSize.medium);
			} else {
				setScreenSize(ScreenSize.large);
			}
		};

		updateScreenSize();

		smallQuery.addEventListener("change", updateScreenSize);
		mediumQuery.addEventListener("change", updateScreenSize);
		largeQuery.addEventListener("change", updateScreenSize);
		return () => {
			smallQuery.removeEventListener("change", updateScreenSize);
			mediumQuery.removeEventListener("change", updateScreenSize);
			largeQuery.removeEventListener("change", updateScreenSize);
		};
	}, []);

	return screenSize;
};

// export const useResponsiveImage = (
// 	imagePair: [Image, Image],
// 	setImage: React.Dispatch<React.SetStateAction<Image>>
// ) => {
// 	const isSmallScreen = useSmallScreenStatus();

// 	useEffect(() => {
// 		setImage(isSmallScreen ? imagePair[0] : imagePair[1]);
// 	}, [isSmallScreen, imagePair, setImage]);
// };
