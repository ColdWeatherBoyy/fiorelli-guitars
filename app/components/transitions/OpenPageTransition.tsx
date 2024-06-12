import React from "react";

const OpenPageTransition = () => (
	<div className="absolute w-screen h-screen">
		<div
			className={`absolute left-0 w-[51%] bg-zinc-100 z-20 h-screen animate-openFromLeft`}
		/>
		<div
			className={`absolute right-0 w-[51%] bg-zinc-100 z-20 h-screen animate-openFromRight`}
		/>
	</div>
);

export default OpenPageTransition;
