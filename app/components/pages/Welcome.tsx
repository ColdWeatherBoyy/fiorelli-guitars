import { FC } from "react";
import { playfair_display } from "../../style/fonts";
import { HomepageState, Image } from "../../utilities/types";
import CoverPageTransition from "../transitions/CoverPageTransition";

interface WelcomeProps {
	homepageState: HomepageState;
	currentImage: Image;
	handleEnter: () => void;
}

const Welcome: FC<WelcomeProps> = ({ homepageState, currentImage, handleEnter }) => {
	return (
		<>
			<div className="z-20 rounded-md bg-zinc-100/40 shadow shadow-zinc-300 backdrop-blur-md p-4 hover:transform hover:shadow-md hover:shadow-zinc-300 hover:scale-105 hover:cursor-pointer active:scale-[99%] active:shadow-inner active:shadow-zinc-300 transition-all ease-in-out duration-200">
				<div
					className={`${playfair_display.className} text-6xl md:text-8xl text-shadow-white`}
					onClick={handleEnter}
				>
					Welcome
				</div>
			</div>
			{homepageState === HomepageState.entering && <CoverPageTransition cover={true} />}
		</>
	);
};

export default Welcome;
