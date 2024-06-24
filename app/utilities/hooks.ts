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

export const useDarkMode = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const checkDarkMode = () => {
			setIsDarkMode(darkModeQuery.matches);
		};

		setIsDarkMode(darkModeQuery.matches);

		darkModeQuery.addEventListener("change", checkDarkMode);
		return () => {
			darkModeQuery.removeEventListener("change", checkDarkMode);
		};
	}, []);

	return isDarkMode;
};

// Thanks to https://medium.com/@josephat94/building-a-custom-hook-to-detect-user-device-in-react-js-e4dd6e0d2d9c for the basic guideline
// I don't think this ws fully working when i realized i didn't need it
// export const useDeviceType = () => {
// 	const [deviceType, setDeviceType] = useState<DeviceType | null>(() => null);

// 	useEffect(() => {
// 		const handleDeviceDetection = () => {
// 			const userAgent = navigator.userAgent.toLowerCase();
// 			const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(
// 				userAgent
// 			);
// 			const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(
// 				userAgent
// 			);

// 			if (isMobile || isTablet) setDeviceType(DeviceType.mobile);
// 			else setDeviceType(DeviceType.desktop);
// 		};

// 		handleDeviceDetection();
// 		window.addEventListener("resize", handleDeviceDetection);

// 		return () => {
// 			window.removeEventListener("resize", handleDeviceDetection);
// 		};
// 	}, []);
// 	return deviceType;
// };

// export const useResponsiveImage = (
// 	imagePair: [Image, Image],
// 	setImage: React.Dispatch<React.SetStateAction<Image>>
// ) => {
// 	const isSmallScreen = useSmallScreenStatus();

// 	useEffect(() => {
// 		setImage(isSmallScreen ? imagePair[0] : imagePair[1]);
// 	}, [isSmallScreen, imagePair, setImage]);
// };
