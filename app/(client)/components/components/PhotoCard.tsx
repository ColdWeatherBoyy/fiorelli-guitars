"use client";

import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { FC } from "react";

interface PhotoCardProps extends CloudinaryResource {
	index?: number;
	length?: number;
	maxHeight?: string;
	square?: boolean;
	children?: React.ReactNode;
}

const PhotoCard: FC<PhotoCardProps> = ({
	width,
	height,
	secure_url,
	public_id,
	blurDataUrl,
	index,
	length,
	maxHeight = "max-h-[80dvh]",
	square = false,
	children,
}) => {
	const incrementIndex = (index: number, length: number) => {
		if (index + 1 === length) {
			console.log("suh", 0);
			return 0;
		} else {
			console.log("dog", index + 1);
			return index + 1;
		}
	};

	const decrementIndex = (index: number, length: number) => {
		if (index - 1 === -1) {
			console.log("here", length - 1);
			return length - 1;
		} else {
			console.log("hi", index - 1);
			return index - 1;
		}
	};
	return (
		<div
			className={`max-w-[95dvw] flex flex-col border border-zinc-400 dark:border-cyan-800 gap-2 items-center rounded-sm bg-cyan-100 dark:bg-cyan-900 shadow-sm shadow-zinc-600/60 backdrop-blur-md p-2 transform transition`}
		>
			<div className="max-h-full flex flex-col gap-3 justify-center items-center">
				{index !== undefined && length ? (
					<div className="flex items-center gap-2">
						<Link
							href={`${decrementIndex(index, length)}`}
							className="text-4xl active:scale-75 active:text-zinc-700 transition-all duration-100 ease-in-out"
						>
							{"<"}
						</Link>
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
						<Link
							href={`${incrementIndex(index, length)}`}
							className="text-4xl active:scale-75 active:text-zinc-700 transition-all duration-100 ease-in-out"
						>
							{">"}
						</Link>
					</div>
				) : (
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
				)}
				{children}
			</div>
		</div>
	);
};
export default PhotoCard;
