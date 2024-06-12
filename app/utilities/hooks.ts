import { useEffect, useState } from "react";

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
