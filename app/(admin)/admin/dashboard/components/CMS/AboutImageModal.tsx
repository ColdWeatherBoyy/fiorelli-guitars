import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";
import { CloudinaryResource } from "@/app/utilities/types";
import { Reorder } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { Dispatch, FC, SetStateAction, useState } from "react";
import AdminModalWrapper from "../notifications/AdminModalWrapper";
import {
	addTagToResource,
	removeFromOneResourceAndThenAddToAnother,
	removeTagFromResource,
} from "@/app/utilities/cloudinaryFunctions/cloudinary.update";

interface AboutImageModalProps {
	setOpen: Dispatch<SetStateAction<boolean>>;
	fullResources: CloudinaryResource[];
	isMobile: boolean;
}

const AboutImageModal: FC<AboutImageModalProps> = ({
	setOpen,
	fullResources,
	isMobile,
}) => {
	const [resources, setResources] = useState<CloudinaryResource[]>(fullResources);

	const handleSaveOrder = async () => {
		// Assess which items need to be updated
		const originalSelectedImages = fullResources.slice(0, 4);
		const newSelectedImages = resources.slice(0, 4);

		const changeTag: { publicId: string; newIndex: number; oldPublicId: string }[] = [];
		const removeTag: { publicId: string; originalIndex: number }[] = [];
		const addTag: { publicId: string; newIndex: number }[] = [];

		newSelectedImages.forEach((newImage, index) => {
			if (
				originalSelectedImages.includes(newImage) &&
				index !== originalSelectedImages.indexOf(newImage)
			) {
				changeTag.push({
					publicId: newImage.public_id,
					newIndex: index,
					oldPublicId: originalSelectedImages[index].public_id,
				});
			} else if (!originalSelectedImages.includes(newImage)) {
				addTag.push({ publicId: newImage.public_id, newIndex: index });
			}
		});
		originalSelectedImages.forEach((originalImage, index) => {
			if (!newSelectedImages.includes(originalImage)) {
				removeTag.push({ publicId: originalImage.public_id, originalIndex: index });
			}
		});

		removeTag.forEach(async (tag) => {
			await removeTagFromResource(tag.publicId, `about_${tag.originalIndex}`);
		});

		changeTag.forEach(async (tag) => {
			await removeFromOneResourceAndThenAddToAnother(
				tag.oldPublicId,
				tag.publicId,
				`about_${tag.newIndex}`
			);
		});

		addTag.forEach(async (tag) => {
			await addTagToResource(tag.publicId, `about_${tag.newIndex}`);
		});
	};

	return (
		<AdminModalWrapper setOpen={setOpen}>
			<div className="w-[90dvw] text-center px-2 py-6 flex flex-col rounded-sm bg-zinc-50 dark:bg-zinc-600 border border-2 border-slate-400 dark:border-slate-500 shadow-sm shadow-slate-400 dark:shadow-slate-900">
				<div className="text-lg font-semibold">Pick Images and Order</div>
				<div className="text-sm">
					Drag your selected four images to the left in the order you want them to appear
					on the About page.
				</div>
				<Reorder.Group
					axis="x"
					values={resources}
					onReorder={setResources}
					className="flex gap-4 items-center overflow-x-auto w-full relative py-4"
				>
					{resources.map((resource, index) => (
						<Reorder.Item
							key={resource.public_id}
							value={resource}
							className="min-w-40 md:min-w-52"
						>
							{index < 4 && (
								<div
									className={`px-3 py-1 text-center font-bold absolute z-10 bg-cyan-400 dark:bg-cyan-500`}
								>
									{index + 1}
								</div>
							)}
							<CldImage
								width={250}
								height={250}
								src={resource.secure_url}
								alt={resource.public_id}
								placeholder="blur"
								blurDataURL={resource.blurDataUrl}
								preserveTransformations
								className={`rounded-sm pointer-events-none ${
									index < 4
										? "border-4 border-cyan-400 dark:border-cyan-500"
										: `border border-slate-500 dark:border-slate-300 opacity-70 shadow shadow-slate-600`
								} shadow shadow-slate-600`}
							/>
						</Reorder.Item>
					))}
				</Reorder.Group>
				<AdminButtonLink
					text="Save New Order"
					isMobile={isMobile}
					handleClick={() => handleSaveOrder()}
				/>
			</div>
		</AdminModalWrapper>
	);
};

export default AboutImageModal;
