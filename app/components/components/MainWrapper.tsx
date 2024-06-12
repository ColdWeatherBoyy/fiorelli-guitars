"use client";

import { BackgroundImageContext } from "@/app/providers/BackgroundImageProvider";
import { FC, ReactNode, useContext } from "react";
import BackgroundImage from "./BackgroundImage";

const MainWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	const { currentImage } = useContext(BackgroundImageContext);
	return (
		<div className="fixed h-screen w-screen overflow-hidden -z-10">
			<BackgroundImage src={currentImage.src} alt={currentImage.alt} />
			<div className="h-screen w-full flex justify-center items-center">{children}</div>
		</div>
	);
};

export default MainWrapper;
