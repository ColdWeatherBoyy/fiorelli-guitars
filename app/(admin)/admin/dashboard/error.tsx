"use client";

import AnimateWrapper from "@/app/components/AnimateWrapper";
import { useEffect } from "react";
import AdminButtonLink from "../../components/components/AdminButtonLink";
import { useDeviceType } from "@/app/utilities/hooks.server";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	// const isMobile = useDeviceType();
	useEffect(() => {
		// Send email to me
		// console.error("hey", error);
	}, [error]);

	return (
		<AnimateWrapper>
			<div className="flex flex-col w-full text-center justify-center">
				<div className="flex flex-col gap-2">
					{/* Unclear why error.name not working */}
					<div className="text-xl text-red-500">{error.stack?.split(":")[0]}</div>
					<div className="text-lg text-red-500">{error.message}</div>
					<div className="text-lg text-red-500">
						If problem persists, please contact the site admin.
					</div>
				</div>
				<div className="flex gap-2">
					<div className="flex w-full justify-evenly mt-4">
						<AdminButtonLink
							href="mailto:elias@fiorelliguitars.com"
							text="Contact"
							isMobile={false}
						/>
						<AdminButtonLink
							text="Try again"
							handleClick={() => reset()}
							isMobile={false}
						/>
					</div>
				</div>
			</div>
		</AnimateWrapper>
	);
}
