"use client";

import { useState } from "react";
import BackgroundImage from "./components/BackgroundImage";
import { playfair_display } from "./style/fonts";

export default function Home() {
	const [entered, setEntered] = useState(false);

	const handleEnter = () => {
		setEntered(true);
	};
	return (
		<>
			{!entered ? (
				<div className="h-screen w-full flex justify-center items-center">
					<BackgroundImage />
					<div className="z-20 rounded-md bg-zinc-100/40 shadow shadow-zinc-300 backdrop-blur-md p-4 hover:transform hover:shadow-md hover:shadow-zinc-300 hover:scale-105 hover:cursor-pointer transition-all ease-in-out duration-200">
						<div
							className={`${playfair_display.className} text-6xl md:text-8xl text-shadow-white`}
							onClick={handleEnter}
						>
							Welcome
						</div>
					</div>
				</div>
			) : (
				<div>Hi</div>
			)}
		</>
	);
}
