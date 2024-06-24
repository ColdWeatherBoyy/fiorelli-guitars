"use client";

import InnerCard from "@/app/components/components/InnerCard";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { FC } from "react";

const GalleryImage: FC<CloudinaryResource> = ({
	width,
	height,
	secure_url,
	public_id,
	blurDataUrl,
}) => {
	return (
		<div className="flex flex-col text-center gap-1">
			<CldImage
				width={width}
				height={height}
				src={secure_url}
				alt={public_id}
				blurDataURL={blurDataUrl}
				placeholder="blur"
			/>
			For all orders, questions, and other inquiries, please reach out!
		</div>
	);
};

export default GalleryImage;
