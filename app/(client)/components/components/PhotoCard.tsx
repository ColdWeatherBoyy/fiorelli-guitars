"use client";

import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { FC } from "react";

interface PhotoCardProps extends CloudinaryResource {
	maxHeight: string;
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
	maxHeight = "max-h-[80dvh]",
}) => {
	return (
		<div
			className={`max-w-[95dvw] flex flex-col border border-zinc-400 dark:border-cyan-800 gap-2 items-center rounded-sm bg-cyan-100 dark:bg-cyan-900 shadow-sm shadow-zinc-600/60 backdrop-blur-md p-2 transform transition`}
		>
			<div className="max-h-full flex flex-col gap-3 justify-center items-center">
				<CldImage
					width={width}
					height={height}
					src={secure_url}
					alt={public_id}
					blurDataURL={blurDataUrl}
					placeholder="blur"
					preserveTransformations={square ? true : false}
					className={`object-scale-down ${maxHeight} w-fit rounded-sm bg-zinc-200 shadow shadow-zinc-500`}
				/>
				{children}
			</div>
		</div>
	);
};
export default PhotoCard;
