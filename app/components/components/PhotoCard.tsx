"use client";

import Card from "@/app/components/components/Card";
import CardButtonLink from "@/app/components/components/CardButtonLink";
import { CloudinaryResource, TextSize } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { FC } from "react";

interface PhotoCardProps {
	photoResource: CloudinaryResource;
}

const PhotoCard: FC<PhotoCardProps> = ({ photoResource }) => {
	return (
		<Card>
			<div className="max-h-full flex flex-col gap-6 justify-center items-center">
				<CldImage
					width={photoResource.width}
					height={photoResource.height}
					src={photoResource.secure_url}
					alt={photoResource.public_id}
					blurDataURL={photoResource.blurDataUrl}
					placeholder="blur"
					className="object-scale-down max-h-[67vh] md:max-h-[63vh] w-fit rounded-sm bg-zinc-200 shadow shadow-zinc-500"
				/>
				<CardButtonLink href="/gallery" text="Back to Gallery" size={TextSize.small} />
			</div>
		</Card>
	);
};
export default PhotoCard;
