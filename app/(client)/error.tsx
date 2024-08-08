"use client";

import { useEffect } from "react";
import AnimateWrapper from "../components/AnimateWrapper";
import Card from "./components/components/Card";
import CardButtonLink from "./components/components/CardButtonLink";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Send email to me
		console.error("hi", error);
		console.error("hi", error.name);
	}, [error]);

	return (
		<AnimateWrapper>
			{/* Still not sure why error.name doesn't work */}
			<Card
				title={error.stack?.split(":")[0]}
				body={[error.message, "If problem persists, please contact the site admin."]}
				error
			>
				<div className="flex w-full justify-evenly mt-4">
					<CardButtonLink href="mailto:elias@fiorelliguitars.com" text="Contact" />
					<CardButtonLink text="Try again" handleClick={() => reset()} />
				</div>
			</Card>
		</AnimateWrapper>
	);
}
