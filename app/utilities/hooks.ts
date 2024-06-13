import { useEffect, useState } from "react";
import { Image } from "./types";

export const useSmallScreenStatus = () => {
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

export const useResponsiveImage = (
	imagePair: [Image, Image],
	setImage: React.Dispatch<React.SetStateAction<Image>>
) => {
	const isSmallScreen = useSmallScreenStatus();

	useEffect(() => {
		setImage(isSmallScreen ? imagePair[0] : imagePair[1]);
	}, [isSmallScreen, imagePair, setImage]);
};
