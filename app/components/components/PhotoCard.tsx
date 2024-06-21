"use client";

import Card from "@/app/components/components/Card";
import CardButtonLink from "@/app/components/components/CardButtonLink";
import { CloudinaryResource, TextSize } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { FC, Suspense } from "react";

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
				className="object-scale-down max-h-[67vh] md:max-h-[63vh] w-fit rounded-sm bg-zinc-200 shadow shadow-zinc-500"
			/>
			<CardButtonLink href="/gallery" text="Back to Gallery" size={TextSize.small} />
		</Card>
	);
};
export default PhotoCard;
