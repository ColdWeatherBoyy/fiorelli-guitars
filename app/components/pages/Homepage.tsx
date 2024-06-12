import { FC } from "react";
import { HomepageState, Picture } from "../../utilities/types";
import BackgroundImage from "../components/BackgroundImage";
import OpenPageTransition from "../transitions/OpenPageTransition";

interface HomepageProps {
	currentPicture: Picture;
	homepageState: HomepageState;
}

const Homepage: FC<HomepageProps> = ({ currentPicture, homepageState }) => {
	return (
		<>
			{homepageState === HomepageState.entered && <OpenPageTransition />}
			<div className="h-screen w-full flex justify-center items-center">
				<BackgroundImage src={currentPicture.src} alt={currentPicture.alt} />
			</div>
		</>
	);
};

export default Homepage;
