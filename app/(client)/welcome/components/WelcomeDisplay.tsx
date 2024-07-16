"use client";

import { CloudinaryResource, TextSize, WelcomeState } from "@/app/utilities/types";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import CardButtonLink from "../../components/components/CardButtonLink";
import CoverPageTransition from "../../components/transitions/CoverPageTransition";
import OpenPageTransition from "../../components/transitions/OpenPageTransition";
import WelcomeImage from "./WelcomeImage";

interface WelcomeDisplayProps {
	welcomeImage: CloudinaryResource;
}

const WelcomeDisplay: FC<WelcomeDisplayProps> = ({ welcomeImage }) => {
	const [welcomeState, setWelcomeState] = useState<WelcomeState>(WelcomeState.welcome);
	const router = useRouter();

	const handleEnter = () => {
		setWelcomeState(WelcomeState.covering);
	};

	useEffect(() => {
		if (!document.cookie.includes("visited=true")) {
			document.cookie = "visited=true";
		}
		setTimeout(() => {
			if (welcomeState === WelcomeState.welcome) {
			}
		}, 4000);

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
		<div className="z-20 absolute flex left-0 top-0 w-dvw h-dvh">
			{welcomeState !== WelcomeState.opening && (
				<>
					<WelcomeImage
						public_id={welcomeImage.public_id}
						secure_url={welcomeImage.secure_url}
						blurDataUrl={welcomeImage.blurDataUrl}
					/>
					<div className="flex w-full items-center justify-center z-20">
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
		</div>
	);
};

export default WelcomeDisplay;
