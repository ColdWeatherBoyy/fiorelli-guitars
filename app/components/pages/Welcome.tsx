import { FC } from "react";
import { playfair_display } from "../../style/fonts";
import { HomepageState, Picture } from "../../utilities/types";
import BackgroundImage from "../components/BackgroundImage";
import CoverPageTransition from "../transitions/CoverPageTransition";

interface WelcomeProps {
	homepageState: HomepageState;
	currentPicture: Picture;
	handleEnter: () => void;
}

const Welcome: FC<WelcomeProps> = ({ homepageState, currentPicture, handleEnter }) => {
	return (
		<div className="h-screen w-full flex justify-center items-center">
			<BackgroundImage src={currentPicture.src} alt={currentPicture.alt} />
			<div className="z-20 rounded-md bg-zinc-100/40 shadow shadow-zinc-300 backdrop-blur-md p-4 hover:transform hover:shadow-md hover:shadow-zinc-300 hover:scale-105 hover:cursor-pointer active:scale-[99%] active:shadow-inner active:shadow-zinc-300 transition-all ease-in-out duration-200">
				<div
					className={`${playfair_display.className} text-6xl md:text-8xl text-shadow-white`}
					onClick={handleEnter}
				>
					Welcome
				</div>
			</div>
			{homepageState === HomepageState.entering && <CoverPageTransition cover={true} />}
		</div>
	);
};

export default Welcome;
