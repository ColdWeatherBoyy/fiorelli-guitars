"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import WelcomeImage from "../components/components/WelcomeImage";
import CoverPageTransition from "../components/transitions/CoverPageTransition";
import { playfair_display } from "../style/fonts";
import { backgroundImageCarousel } from "../utilities/constants";
import { TextSize, WelcomeState } from "../utilities/types";
import CardButton from "../components/components/CardButtonLink";
import OpenPageTransition from "../components/transitions/OpenPageTransition";

export default function Home() {
	const [welcomeState, setWelcomeState] = useState<WelcomeState>(WelcomeState.welcome);
	const router = useRouter();

	const handleEnter = () => {
		setWelcomeState(WelcomeState.covering);
		document.cookie = "visited";
	};
	useEffect(() => {
		if (welcomeState === WelcomeState.covering) {
			setTimeout(() => {
				setWelcomeState(WelcomeState.opening);
			}, 1000);
		}
		if (welcomeState === WelcomeState.opening) {
			setTimeout(() => {
				router.push("/");
			}, 1000);
		}
	}, [welcomeState]);

	return (
		<>
			{welcomeState !== WelcomeState.opening && (
				<>
					<WelcomeImage
						src={backgroundImageCarousel[0].src}
						alt={backgroundImageCarousel[0].alt}
					/>
					<div className="flex w-full items-center justify-center z-30">
						<CardButton text="Welcome" size={TextSize.large} handleClick={handleEnter} />
					</div>
				</>
			)}
			{welcomeState === WelcomeState.covering && <CoverPageTransition cover={true} />}
			{welcomeState === WelcomeState.opening && <OpenPageTransition />}
		</>
	);
}
