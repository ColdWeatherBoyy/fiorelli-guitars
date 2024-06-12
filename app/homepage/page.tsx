import { FC } from "react";
import BackgroundImage from "../components/components/BackgroundImage";
import OpenPageTransition from "../components/transitions/OpenPageTransition";
import { HomepageState, Image } from "../utilities/types";

interface HomepageProps {
	currentImage: Image;
	homepageState: HomepageState;
}

const Homepage: FC<HomepageProps> = ({ currentImage, homepageState }) => {
	return (
		<>
			{homepageState === HomepageState.entered && <OpenPageTransition />}
			<div className="z-30">hi</div>
		</>
	);
};

export default Homepage;
