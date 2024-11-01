import LoadingIcon from "@/app/components/SVGs/LoadingIcon";
import XIcon from "@/app/components/SVGs/XIcon";
import { deleteResource } from "@/app/utilities/cloudinaryFunctions/cloudinary.delete";
import { getResources } from "@/app/utilities/cloudinaryFunctions/cloudinary.get";
import { removeFromOneResourceAndThenAddToAnother } from "@/app/utilities/cloudinaryFunctions/cloudinary.update";
import { hasPositiveResult } from "@/app/utilities/typeguardFunctions";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface ContactFeatureImageGalleryProps {
	galleryTag: string;
	updateCount: number;
	setUpdateCount: Dispatch<SetStateAction<number>>;
	selectedTag: string;
	isMobile: boolean;
}

const ContactFeatureImageGallery: FC<ContactFeatureImageGalleryProps> = ({
	galleryTag,
	updateCount,
	setUpdateCount,
	selectedTag,
	isMobile,
}) => {
	const [fullResources, setFullResources] = useState<CloudinaryResource[]>([]);
	const [orderedResources, setOrderedResources] = useState<CloudinaryResource[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchResources = async () => {
			const resources = await getResources(galleryTag);
			if (resources.length === 0 || !resources) {
				setLoading(false);
				setError(true);
			}
			setFullResources(resources);
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

	useEffect(() => {
		if (orderedResources.length === 0) return;
		setLoading(false);
	}, [orderedResources]);

	const handleDelete = async (publicId: string) => {
		const deletedResource = await deleteResource(publicId);
		if (hasPositiveResult(deletedResource)) {
			setUpdateCount((prev) => prev - 1);
		}
	};

	const handleSetBackground = async (publicId: string, resource: CloudinaryResource) => {
		if (resource.tags.includes(selectedTag)) return;
		const currentBackground = fullResources.find((resource) =>
			resource.tags.includes(selectedTag)
		);
		if (!currentBackground) return;
		setLoading(true);
		const newBackground = await removeFromOneResourceAndThenAddToAnother(
			currentBackground.public_id,
			publicId,
			selectedTag
		);
		console.log(newBackground);

		setTimeout(() => {
			setUpdateCount((prev) => prev + 1);
		}, 1500);
	};

	return (
		<div className="w-full col-span-2 grid grid-cols-3 gap-4">
			{loading ? (
				<div className="col-span-3 flex justify-center">
					<LoadingIcon />
				</div>
			) : error ? (
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
							onClick={() => handleSetBackground(resource.public_id, resource)}
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
									: `border border-slate-500 dark:border-slate-300 opacity-70 transition-all duration-100 ease-in-out active:scale-95%] cursor-pointer ${
											!isMobile &&
											"hover:border-cyan-400 dark:hover:border-cyan-500 hover:opacity-100"
									  }`
							} shadow shadow-slate-600`}
						/>
					</div>
				))
			)}
		</div>
	);
};

export default ContactFeatureImageGallery;
