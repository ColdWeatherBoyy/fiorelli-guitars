import XIcon from "@/app/components/SVGs/XIcon";
import { deleteResource } from "@/app/utilities/cloudinaryFunctions/cloudinary.delete";
import { getResources } from "@/app/utilities/cloudinaryFunctions/cloudinary.get";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface BackgroundImageGalleryProps {
	updateCount: number;
	setUpdateCount: Dispatch<SetStateAction<number>>;
	selectedTag: string;
	isMobile: boolean;
}

const BackgroundImageGallery: FC<BackgroundImageGalleryProps> = ({
	updateCount,
	setUpdateCount,
	selectedTag,
	isMobile,
}) => {
	const [fullResources, setFullResources] = useState<CloudinaryResource[]>([]);
	const [orderedResources, setOrderedResources] = useState<CloudinaryResource[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const fetchResources = async () => {
			const resources = await getResources("background");
			setFullResources(resources);
			setLoading(false);
		};
		fetchResources();
	}, [updateCount]);

	useEffect(() => {
		setOrderedResources(
			fullResources.slice().sort((a, b) => {
				if (a.tags.includes(selectedTag)) return -1;
				if (b.tags.includes(selectedTag)) return 1;
				return 0;
			})
		);
	}, [fullResources, selectedTag]);

	const handleDelete = async (publicId: string) => {
		const deletedResource = await deleteResource(publicId);
		if (deletedResource === "ok") {
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
				orderedResources.map((resource) => (
					<div key={resource.public_id} className="relative w-fit">
						<div
							onClick={() => handleDelete(resource.public_id)}
							className={`absolute z-10 bg-slate-300 text-slate-500 dark:bg-slate-500 dark:text-slate-300 rounded-full top-2 right-2 cursor-pointer active:scale-95 transition-all duration-100 ease-in-out
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
							className={`rounded-sm ${
								selectedTag && resource.tags.includes(selectedTag)
									? "border-4 border-cyan-400 dark:border-cyan-500"
									: "border border-slate-500 dark:border-slate-300 opacity-70"
							} shadow shadow-slate-600`}
						/>
					</div>
				))
			)}
		</div>
	);
};

export default BackgroundImageGallery;
