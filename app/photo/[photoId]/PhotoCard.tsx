"use client";

import AnimateWrapper from "@/app/components/components/AnimateWrapper";
import Card from "@/app/components/components/Card";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { FC } from "react";

interface PhotoCardProps {
	photoResource: CloudinaryResource;
}

const PhotoCard: FC<PhotoCardProps> = ({ photoResource }) => {
	return (
		<AnimateWrapper>
			<CldImage
				width={photoResource.width}
				height={photoResource.height}
				src={photoResource.secure_url}
				alt={photoResource.public_id}
				blurDataURL={photoResource.secure_url}
				className="max-w-full rounded-sm bg-zinc-100 backdrop-blur shadow shadow-zinc-500"
			/>
		</AnimateWrapper>
	);
};
export default PhotoCard;
