"use client";

import { CloudinaryResource, TextSize, WelcomeState } from "@/app/utilities/types";
import WelcomeImage from "./WelcomeImage";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CoverPageTransition from "@/app/components/transitions/CoverPageTransition";
import OpenPageTransition from "@/app/components/transitions/OpenPageTransition";
import CardButtonLink from "@/app/components/components/CardButtonLink";

interface WelcomeDisplayProps {
	welcomeImage: CloudinaryResource;
}

const WelcomeDisplay: FC<WelcomeDisplayProps> = ({ welcomeImage }) => {
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
	}, [welcomeState, router]);

	return (
		<>
			{welcomeState !== WelcomeState.opening && (
				<>
					<WelcomeImage
						public_id={welcomeImage.public_id}
						secure_url={welcomeImage.secure_url}
					/>
					<div className="flex w-full items-center justify-center z-30">
						<CardButtonLink
							text="Welcome"
							size={TextSize.large}
							handleClick={handleEnter}
						/>
					</div>
				</>
			)}
			{welcomeState === WelcomeState.covering && <CoverPageTransition cover={true} />}
			{welcomeState === WelcomeState.opening && <OpenPageTransition />}
		</>
	);
};

export default WelcomeDisplay;
