import { getResources } from "@/app/utilities/cloudinaryFunctions/cloudinary.get";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { FC, useEffect, useState } from "react";

interface GuitarImageGalleryProps {
	tag: string;
}

const GuitarImageGallery: FC<GuitarImageGalleryProps> = ({ tag }) => {
	const [fullResources, setFullResources] = useState<CloudinaryResource[]>([]);

	useEffect(() => {
		setFullResources([]);
		const fetchResources = async () => {
			const resources = await getResources(tag);
			setFullResources(resources);
		};
		fetchResources();
	}, [tag]);

	return (
		<div className="w-full col-span-2 grid grid-cols-3 gap-4">
			{fullResources.length === 0 ? (
				<div className="col-span-">Loading...</div>
			) : (
				fullResources.map((resource) => (
					<CldImage
						key={resource.public_id}
						width={250}
						height={250}
						src={resource.secure_url}
						alt={resource.public_id}
						placeholder="blur"
						blurDataURL={resource.blurDataUrl}
						preserveTransformations
						className="rounded-sm border border-slate-500 dark:border-slate-300 shadow shadow-slate-600 "
					/>
				))
			)}
		</div>
	);
};

export default GuitarImageGallery;
