"use client";

import { useState } from "react";
import BackgroundImage from "./components/BackgroundImage";

export default function Home() {
	const [entered, setEntered] = useState(false);
	return (
		<>
			{!entered ? (
				<div className="h-screen w-full flex justify-center items-center">
					<BackgroundImage />
					<div className="z-20 rounded-md bg-zinc-100 p-2 bg-opacity-75">
						<div className="text-2xl">Welcome</div>
					</div>
				</div>
			) : (
				<div>Hi</div>
			)}
		</>
	);
}
