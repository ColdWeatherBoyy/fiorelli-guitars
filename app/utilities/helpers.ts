import { backgroundImagesLarge, backgroundImagesSmall } from "./constants";
import { useSmallScreenStatus } from "./hooks";
import { HomepageState, Image } from "./types";

export const pickResponsiveImage = (largeImage: Image, smallImage: Image) => {
	const isSmallScreen = window.innerWidth < 768;
	return isSmallScreen ? smallImage : largeImage;
};

export const pickImagePair = (state: HomepageState): [Image, Image] => {
	if (state !== HomepageState.entered) {
		return [backgroundImagesSmall.J_SP_Hold, backgroundImagesLarge.J_SP_Hold];
	} else {
		return [backgroundImagesSmall.HB_Detail_1, backgroundImagesLarge.WS_Shop];
	}
};
