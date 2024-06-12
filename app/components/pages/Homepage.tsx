import { FC } from "react";
import { HomepageState, Image } from "../../utilities/types";
import BackgroundImage from "../components/BackgroundImage";
import OpenPageTransition from "../transitions/OpenPageTransition";

interface HomepageProps {
	currentImage: Image;
	homepageState: HomepageState;
}

const Homepage: FC<HomepageProps> = ({ currentImage, homepageState }) => {
	return (
		<>
			{homepageState === HomepageState.entered && <OpenPageTransition />}
			<div className="h-screen w-full flex justify-center items-center">
				<BackgroundImage src={currentImage.src} alt={currentImage.alt} />
			</div>
		</>
	);
};

export default Homepage;
