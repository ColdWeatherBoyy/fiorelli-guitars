"use client";

import Card from "@/app/components/components/Card";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { FC } from "react";

interface PhotoCardProps extends CloudinaryResource {
	square?: boolean;
	children?: React.ReactNode;
}

const PhotoCard: FC<PhotoCardProps> = ({
	width,
	height,
	secure_url,
	public_id,
	blurDataUrl,
	square = false,
	children,
}) => {
	return (
		<Card maxHeight="max-h-none">
			<div className="max-h-full flex flex-col gap-3 justify-center items-center">
				<CldImage
					width={width}
					height={height}
					src={secure_url}
					alt={public_id}
					blurDataURL={blurDataUrl}
					placeholder="blur"
					preserveTransformations={square ? true : false}
					className="object-scale-down max-h-[80vh] w-fit rounded-sm bg-zinc-200 shadow shadow-zinc-500"
				/>
				{children}
			</div>
		</Card>
	);
};
export default PhotoCard;
