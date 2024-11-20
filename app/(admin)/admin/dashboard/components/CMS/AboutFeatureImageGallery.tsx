import LoadingIcon from "@/app/components/SVGs/LoadingIcon";
import XIcon from "@/app/components/SVGs/XIcon";
import { deleteResource } from "@/app/utilities/cloudinaryFunctions/cloudinary.delete";
import { getResources } from "@/app/utilities/cloudinaryFunctions/cloudinary.get";
import { sortResourcesByPriority } from "@/app/utilities/helpers";
import { hasPositiveResult } from "@/app/utilities/typeguardFunctions";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { Reorder } from "framer-motion";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";
import AdminModalWrapper from "../notifications/AdminModalWrapper";
import AboutImageModal from "./AboutImageModal";

interface AboutFeatureImageGalleryProps {
	galleryTag: string;
	updateCount: number;
	setUpdateCount: Dispatch<SetStateAction<number>>;
	isMobile: boolean;
}

const AboutFeatureImageGallery: FC<AboutFeatureImageGalleryProps> = ({
	galleryTag,
	updateCount,
	setUpdateCount,
	isMobile,
}) => {
	const [fullResources, setFullResources] = useState<CloudinaryResource[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [open, setOpen] = useState(false);
	const hasFetched = useRef(false);

	useEffect(() => {
		const orderResources = (resources: CloudinaryResource[]) => {
			const orderedTags = ["about_1", "about_2", "about_3", "about_4"];
			sortResourcesByPriority(orderedTags, resources);
			return resources;
		};

		const fetchResources = async () => {
			try {
				const resources = await getResources(galleryTag);
				if (resources.length === 0 || !resources) {
					setError(true);
				} else {
					setFullResources(orderResources(resources));
					hasFetched.current = true;
				}
			} catch (error) {
				console.error(error);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		setLoading(true);
		if (!hasFetched.current) {
			fetchResources();
		} else {
			// To-Do: Figure out why Timeout is needed
			setTimeout(() => {
				setFullResources((prevResources) => orderResources(prevResources));
				setLoading(false);
			}, 250);
		}
	}, [updateCount, galleryTag]);

	const handleDelete = async (publicId: string) => {
		const deletedResource = await deleteResource(publicId);
		if (hasPositiveResult(deletedResource)) {
			setUpdateCount((prev) => prev - 1);
		}
	};

	return (
		<>
			<div className="w-full col-span-2 grid grid-cols-3 gap-4">
				{loading ? (
					<div className="col-span-3 flex justify-center">
						<LoadingIcon />
					</div>
				) : error ? (
					<div className="col-span-3 flex justify-center">No images found.</div>
				) : (
					<>
						{fullResources.map((resource, index) => (
							<div className="relative w-fit">
								<div
									onClick={() => handleDelete(resource.public_id)}
									className={`absolute z-10 bg-slate-300 text-slate-500 dark:bg-slate-500 dark:text-slate-300 rounded-full top-2 right-2 cursor-pointer active:scale-95 transition-all duration-100 ease-in-out
									${!isMobile && "hover:scale-[110%]"}`}
								>
									<XIcon />
								</div>
								{index < 4 && (
									<div
										className={`px-3 py-1 text-center font-bold absolute z-10 bg-cyan-400 dark:bg-cyan-500`}
									>
										{index + 1}
									</div>
								)}
								<CldImage
									onClick={() => console.log("clicked")}
									width={250}
									height={250}
									src={resource.secure_url}
									alt={resource.public_id}
									placeholder="blur"
									blurDataURL={resource.blurDataUrl}
									preserveTransformations
									className={`rounded-sm ${
										index < 4
											? "border-4 border-cyan-400 dark:border-cyan-500"
											: `border border-slate-500 dark:border-slate-300 opacity-70 shadow shadow-slate-600`
									} shadow shadow-slate-600`}
								/>
							</div>
						))}
						<div className="w-full flex justify-center my-4 col-span-3">
							<AdminButtonLink
								text="Select Images"
								isMobile={isMobile}
								handleClick={() => setOpen(true)}
							/>
						</div>
					</>
				)}
			</div>
			{open && <AboutImageModal fullResources={fullResources} setOpen={setOpen} />}
		</>
	);
};

export default AboutFeatureImageGallery;
