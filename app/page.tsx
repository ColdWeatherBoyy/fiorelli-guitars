"use client";

import { useState } from "react";
import BackgroundImage from "./components/BackgroundImage";
import { playfair_display } from "./style/fonts";

export default function Home() {
	const [entered, setEntered] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleEnter = () => {
		setLoading(true);
		setTimeout(() => {
			console.log("new page");
			// setEntered(true);
		}, 3000);
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
					{/* <div
						className={`absolute left-0 bg-zinc-100 z-20 h-screen ${
							loading ? "animate-clearFromLeft" : ""
						}`}
					/>
					<div
						className={`absolute right-0 bg-zinc-100 z-20 h-screen ${
							loading ? "animate-clearFromRight" : ""
						}`}
					/> */}
					<div
						className={`absolute top-0 bg-zinc-100 z-20 w-screen ${
							loading ? "animate-clearFromTop" : ""
						}`}
					/>
					<div
						className={`absolute bottom-0 bg-zinc-100 z-20 w-screen ${
							loading ? "animate-clearFromBottom" : ""
						}`}
					/>
				</div>
			) : (
				<div>Hi</div>
			)}
		</>
	);
}
