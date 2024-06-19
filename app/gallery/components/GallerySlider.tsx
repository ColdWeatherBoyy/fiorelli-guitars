"use client";

import Card from "@/app/components/components/Card";
import { useScreenSize } from "@/app/utilities/hooks";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { FC } from "react";

interface GallerySliderProps {
	resources: CloudinaryResource[];
	title: string;
}

const GallerySlider: FC<GallerySliderProps> = ({ resources, title }) => {
	const screenSize = useScreenSize();
	return (
		<Card title={title}>
			<div className="overflow-scroll flex rounded-sm gap-5 bg-zinc-300 p-5 shadow-inner shadow-zinc-500">
				{resources.map((resource) => {
					const thumbnailResourceLink = resource.secure_url.replace(
						"upload/",
						"upload/c_thumb,h_500,w_500/"
					);
					return (
						<CldImage
							key={resource.public_id}
							width={`${screenSize === "extraSmall" ? "125" : "150"}`}
							height="150"
							src={thumbnailResourceLink}
							alt={resource.public_id}
							blurDataURL={thumbnailResourceLink}
							preserveTransformations
							className="rounded-sm bg-cyan-800 shadow shadow-zinc-500c"
						/>
					);
				})}
			</div>
		</Card>
	);
};

export default GallerySlider;
