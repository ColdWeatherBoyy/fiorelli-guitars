// "use client";

// import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
// import { backgroundImagesLarge } from "../utilities/constants";
// import { Image } from "../utilities/types";
// import { useIsSmallScreen } from "../utilities/hooks";

// interface BackgroundImageInterface {
// 	setCurrentImage: Dispatch<SetStateAction<Image>>;
// 	currentImage: Image;
// }

// export const BackgroundImageContext = createContext<BackgroundImageInterface>({
// 	setCurrentImage: () => {},
// 	currentImage: backgroundImagesLarge.J_SP_Hold,
// });

// export const BackgroundImageProvider: React.FC<{ children: React.ReactNode }> = ({
// 	children,
// }) => {
// 	const [currentImage, setCurrentImage] = useState<Image>(
// 		backgroundImagesLarge.J_SP_Hold
// 	);

// 	return (
// 		<BackgroundImageContext.Provider value={{ setCurrentImage, currentImage }}>
// 			{children}
// 		</BackgroundImageContext.Provider>
// 	);
// };
