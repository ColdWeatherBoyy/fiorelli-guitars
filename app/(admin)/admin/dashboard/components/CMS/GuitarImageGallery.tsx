import { getResources } from "@/app/utilities/cloudinaryFunctions/cloudinary.get";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { FC, useEffect, useState } from "react";

interface GuitarImageGalleryProps {
	tag: string;
	updateCount: number;
}

const GuitarImageGallery: FC<GuitarImageGalleryProps> = ({ tag, updateCount }) => {
	const [fullResources, setFullResources] = useState<CloudinaryResource[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setFullResources([]);
		const fetchResources = async () => {
			const resources = await getResources(tag);
			setFullResources(resources);
			setLoading(false);
		};
		fetchResources();
	}, [tag, updateCount]);

	return (
		<div className="w-full col-span-2 grid grid-cols-3 gap-4">
			{loading ? (
				<div className="col-span-3 flex justify-center">Loading...</div>
			) : fullResources.length === 0 ? (
				<div className="col-span-3 flex justify-center">No images found.</div>
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
