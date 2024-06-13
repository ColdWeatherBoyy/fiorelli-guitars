"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import WelcomeImage from "../components/components/WelcomeImage";
import CoverPageTransition from "../components/transitions/CoverPageTransition";
import { playfair_display } from "../style/fonts";
import { backgroundImageCarousel } from "../utilities/constants";
import { TextSize, WelcomeState } from "../utilities/types";
import CardButton from "../components/components/CardButton";

export default function Home() {
	const [welcomeState, setWelcomeState] = useState<WelcomeState>(WelcomeState.welcome);
	const router = useRouter();

	const handleEnter = () => {
		setWelcomeState(WelcomeState.entering);
		document.cookie = "visited";
		setTimeout(() => {
			router.push("/");
		}, 1000);
	};

	return (
		<>
			<WelcomeImage
				src={backgroundImageCarousel[0].src}
				alt={backgroundImageCarousel[0].alt}
			/>
			<CardButton text="Welcome" size={TextSize.large} handleClick={handleEnter} />
			{welcomeState === WelcomeState.entering && <CoverPageTransition cover={true} />}
		</>
	);
}
