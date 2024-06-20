"use client";

import Card from "@/app/components/components/Card";
import CardButtonLink from "@/app/components/components/CardButtonLink";
import { CloudinaryResource, TextSize } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { FC } from "react";

interface PhotoCardProps {
	photoResource: CloudinaryResource;
	isModal?: boolean;
}

const PhotoCard: FC<PhotoCardProps> = ({ photoResource, isModal = false }) => {
	return (
		<Card>
			<CldImage
				width={photoResource.width}
				height={photoResource.height}
				src={photoResource.secure_url}
				alt={photoResource.public_id}
				blurDataURL={photoResource.secure_url}
				className="object-scale-down lg:max-h-[65vh] w-fit rounded-sm bg-zinc-200 shadow shadow-zinc-500"
			/>
			<CardButtonLink
				href={isModal ? "/photo" : "/gallery"}
				text="Back to Gallery"
				size={TextSize.small}
			/>
		</Card>
	);
};
export default PhotoCard;
