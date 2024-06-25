"use client";

import Card from "@/app/components/components/Card";
import CardButtonLink from "@/app/components/components/CardButtonLink";
import { CloudinaryResource, TextSize } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { FC } from "react";
import InnerCard from "./InnerCard";

const PhotoCard: FC<CloudinaryResource> = ({
	width,
	height,
	secure_url,
	public_id,
	blurDataUrl,
}) => {
	return (
		<Card>
			<div className="max-h-full flex flex-col gap-6 justify-center items-center">
				<CldImage
					width={width}
					height={height}
					src={secure_url}
					alt={public_id}
					blurDataURL={blurDataUrl}
					placeholder="blur"
					className="object-scale-down max-h-[67vh] md:max-h-[63vh] w-fit rounded-sm bg-zinc-200 shadow shadow-zinc-500"
				/>
				<CardButtonLink href="/gallery" text="Back to Gallery" size={TextSize.small} />
			</div>
		</Card>
	);
};
export default PhotoCard;
