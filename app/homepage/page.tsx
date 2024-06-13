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
			<div className="text-7xl text-black">hi</div>
		</>
	);
};

export default Homepage;
