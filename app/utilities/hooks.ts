import { useState, useEffect } from "react";

export const useIsSmallScreen = () => {
	const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
		() => window.innerWidth < 768
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
