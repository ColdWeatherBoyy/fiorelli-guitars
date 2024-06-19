"use client";

import Card from "@/app/components/components/Card";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { FC } from "react";

interface GallerySliderProps {
	resources: CloudinaryResource[];
	title: string;
}

const GallerySlider: FC<GallerySliderProps> = ({ resources, title }) => {
	return (
		<Card title={title}>
			<div className="lg:w-[75%] flex overflow-scroll rounded-sm gap-4 items-center bg-zinc-300 p-3 items-center shadow-inner shadow-zinc-500">
				{resources.map((resource) => {
					const thumbnailResourceLink = resource.secure_url.replace(
						"upload/",
						"upload/c_thumb,h_500,w_500/"
					);
					return (
						<div
							className="flex flex-col items-center bg-cyan-800 shadow-sm shadow-zinc-500"
							key={resource.public_id}
						>
							<CldImage
								src={thumbnailResourceLink}
								alt={resource.public_id}
								width={80}
								height={80}
								blurDataURL={thumbnailResourceLink}
								quality={100}
							/>
						</div>
					);
				})}
			</div>
		</Card>
	);
};

export default GallerySlider;
