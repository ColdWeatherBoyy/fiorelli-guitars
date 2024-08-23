import XIcon from "@/app/components/SVGs/XIcon";
import { deleteResource } from "@/app/utilities/cloudinaryFunctions/cloudinary.delete";
import { getResources } from "@/app/utilities/cloudinaryFunctions/cloudinary.get";
import { hasPositiveResult } from "@/app/utilities/typeguardFunctions";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface GuitarImageGalleryProps {
	tag: string;
	updateCount: number;
	setUpdateCount: Dispatch<SetStateAction<number>>;
	isMobile: boolean;
}

const GuitarImageGallery: FC<GuitarImageGalleryProps> = ({
	tag,
	updateCount,
	setUpdateCount,
	isMobile,
}) => {
	const [fullResources, setFullResources] = useState<CloudinaryResource[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		setFullResources([]);
		const fetchResources = async () => {
			const resources = await getResources(tag);
			setFullResources(resources);
			setLoading(false);
		};
		fetchResources();
	}, [tag, updateCount]);

	const handleClick = async (publicId: string) => {
		const deletedResource = await deleteResource(publicId);
		if (hasPositiveResult(deletedResource)) {
			setUpdateCount((prev) => prev - 1);
		}
	};

	return (
		<div className="w-full col-span-2 grid grid-cols-3 gap-4">
			{loading ? (
				<div className="col-span-3 flex justify-center">Loading...</div>
			) : fullResources.length === 0 ? (
				<div className="col-span-3 flex justify-center">No images found.</div>
			) : (
				fullResources.map((resource) => (
					<div key={resource.public_id} className="relative w-fit">
						<div
							onClick={() => handleClick(resource.public_id)}
							className={`absolute bg-slate-300 text-slate-500 dark:bg-slate-500 dark:text-slate-300 rounded-full top-2 right-2 cursor-pointer active:scale-95 transition-all duration-100 ease-in-out
									${!isMobile && "hover:scale-[110%]"}`}
						>
							<XIcon />
						</div>
						<CldImage
							width={250}
							height={250}
							src={resource.secure_url}
							alt={resource.public_id}
							placeholder="blur"
							blurDataURL={resource.blurDataUrl}
							preserveTransformations
							className="rounded-sm border border-slate-500 dark:border-slate-300 shadow shadow-slate-600 "
						/>
					</div>
				))
			)}
		</div>
	);
};

export default GuitarImageGallery;
