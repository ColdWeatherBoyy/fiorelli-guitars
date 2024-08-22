"use client";

import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface BackgroundImageProps {
	resources: CloudinaryResource[];
}

const BackgroundImage: FC<BackgroundImageProps> = ({ resources }) => {
	const [currentResource, setCurrentResource] = useState<CloudinaryResource | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		const tagMap: { [key: string]: string } = {
			"": "home_bg",
			gallery: "gallery_bg",
			contact: "contact_bg",
			about: "about_bg",
		};
		const segments = pathname.split("/").filter(Boolean);
		let firstSegment = segments[0] || "";
		const tag = tagMap[firstSegment];
		if (tag) {
			const resource = resources.find((resource) => resource.tags.includes(tag));
			if (resource) {
				setCurrentResource(resource);
			}
		}
	}, [pathname, resources]);

	return (
		<div className="absolute inset-0 -z-20">
			{currentResource && (
				<CldImage
					src={currentResource.secure_url}
					alt={currentResource.public_id}
					fill
					placeholder="blur"
					blurDataURL={currentResource.blurDataUrl}
					sizes="100vw"
					style={{
						objectFit: "cover",
					}}
					priority={true}
					loading="eager"
				/>
			)}
		</div>
	);
};

export default BackgroundImage;
