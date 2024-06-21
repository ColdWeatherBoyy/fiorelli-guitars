"use client";

import InnerCard from "@/app/components/components/InnerCard";
import { useScreenSize } from "@/app/utilities/hooks";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { FC } from "react";

interface GallerySliderProps {
	resources: CloudinaryResource[];
	title: string;
}

const GallerySlider: FC<GallerySliderProps> = ({ resources, title }) => {
	const screenSize = useScreenSize();

	return (
		<InnerCard title={title}>
			<div className="overflow-scroll flex rounded-sm gap-6 bg-zinc-50 dark:bg-zinc-300 p-5 shadow-inner shadow-zinc-700">
				{resources.map((resource) => {
					return (
						<Link
							key={resource.public_id}
							href={`/gallery/${resource.public_id}`}
							className="contents"
						>
							<CldImage
								width={`${screenSize === "extraSmall" ? "125" : "150"}`}
								height={`${screenSize === "extraSmall" ? "125" : "150"}`}
								src={resource.secure_url}
								alt={resource.public_id}
								placeholder="blur"
								blurDataURL={resource.blurDataUrl}
								preserveTransformations
								className="rounded-sm bg-zinc-100 shadow shadow-zinc-500"
							/>
						</Link>
					);
				})}
			</div>
		</InnerCard>
	);
};

export default GallerySlider;
