"use client";

import { useScreenSize } from "@/app/utilities/hooks";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { FC } from "react";
import InnerCard from "../../components/components/InnerCard";

interface GallerySliderProps {
	resources: CloudinaryResource[];
	title: string;
}

const GallerySlider: FC<GallerySliderProps> = ({ resources, title }) => {
	const screenSize = useScreenSize();

	return (
		<InnerCard title={title}>
			<div className="overflow-auto flex rounded-sm gap-6 bg-zinc-50 dark:bg-zinc-300 p-5 shadow-inner shadow-zinc-700">
				{resources.map((resource) => {
					return (
						<Link
							key={resource.public_id}
							href={`/gallery/${resource.public_id}`}
							className="contents"
						>
							<CldImage
								width={`${screenSize === "extraSmall" ? "100" : "125"}`}
								height={`${screenSize === "extraSmall" ? "100" : "125"}`}
								src={resource.secure_url}
								alt={resource.public_id}
								placeholder="blur"
								blurDataURL={resource.blurDataUrl}
								preserveTransformations
								className="rounded-sm bg-zinc-100 shadow shadow-zinc-500 hover:shadow-zinc-500 hover:shadow-md active:shadow-inner active:shadow-zinc-500 transition-all duration-150 ease-in-out cursor-pointer"
							/>
						</Link>
					);
				})}
			</div>
		</InnerCard>
	);
};

export default GallerySlider;
