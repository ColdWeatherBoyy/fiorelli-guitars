"use client";

import { useState } from "react";
import BackgroundImage from "./components/BackgroundImage";
import { playfair_display } from "./style/fonts";
import OpenPageTransition from "./components/OpenPageTransition";
import CoverPageTransition from "./components/CoverPageTransition";

enum PageState {
	welcome = "welcome",
	entering = "entering",
	entered = "entered",
}

export default function Home() {
	const [pageState, setPageState] = useState<PageState>(PageState.welcome);

	const handleEnter = () => {
		setPageState(PageState.entering);
		setTimeout(() => {
			setPageState(PageState.entered);
		}, 1000);
	};

	return (
		<>
			{pageState !== PageState.entered ? (
				<div className="h-screen w-full flex justify-center items-center">
					<BackgroundImage />
					<div className="z-20 rounded-md bg-zinc-100/40 shadow shadow-zinc-300 backdrop-blur-md p-4 hover:transform hover:shadow-md hover:shadow-zinc-300 hover:scale-105 hover:cursor-pointer active:scale-[99%] active:shadow-inner active:shadow-zinc-300 transition-all ease-in-out duration-200">
						<div
							className={`${playfair_display.className} text-6xl md:text-8xl text-shadow-white`}
							onClick={handleEnter}
						>
							Welcome
						</div>
					</div>
					{pageState === PageState.entering && <CoverPageTransition cover={true} />}
				</div>
			) : (
				<>
					{pageState === PageState.entered && <OpenPageTransition />}
					<div>Hi</div>
				</>
			)}
		</>
	);
}
