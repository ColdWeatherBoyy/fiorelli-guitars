"use client";

import { FC } from "react";
import OpenPageTransition from "../components/transitions/OpenPageTransition";
import { backgroundImagesLarge, backgroundImagesSmall } from "../utilities/constants";
import { useBackgroundImage } from "../utilities/hooks";

const Homepage: FC = () => {
	useBackgroundImage(backgroundImagesLarge.WS_Shop, backgroundImagesSmall.HB_Detail_1);

	return (
		<>
			<OpenPageTransition />
			<div className="z-10 text-7xl">hi</div>
		</>
	);
};

export default Homepage;
