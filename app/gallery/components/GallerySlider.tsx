"use client";

import Card from "@/app/components/components/Card";
import Image from "next/image";
import { CloudinaryResource } from "../page";
import { FC } from "react";
import { CldImage } from "next-cloudinary";

interface GallerySliderProps {
	resources: CloudinaryResource[];
}

const GallerySlider: FC<GallerySliderProps> = ({ resources }) => {
	return (
		<Card title="The Cormorant">
			<div className="flex overflow-scroll gap-4 items-center">
				{resources.map((resource, index) => (
					<CldImage
						key={resource.public_id}
						src={resource.secure_url}
						alt={resource.public_id}
						width={80}
						height={80}
						blurDataURL={resource.secure_url}
						quality={100}
						sizes="50px"
					/>
				))}
			</div>
		</Card>
	);
};

export default GallerySlider;
