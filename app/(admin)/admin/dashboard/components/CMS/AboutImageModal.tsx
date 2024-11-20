import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";
import LoadingIcon from "@/app/components/SVGs/LoadingIcon";
import {
	addTagToResource,
	removeFromOneResourceAndThenAddToAnother,
	removeTagFromResource,
} from "@/app/utilities/cloudinaryFunctions/cloudinary.update";
import { CloudinaryResource, NotificationContentType } from "@/app/utilities/types";
import { Reorder } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface AboutImageModalProps {
	setComplete: Dispatch<SetStateAction<boolean>>;
	fullResources: CloudinaryResource[];
	setNotificationContent: Dispatch<SetStateAction<NotificationContentType>>;
	setSuccess: Dispatch<SetStateAction<boolean>>;
	isMobile: boolean;
}

const AboutImageModal: FC<AboutImageModalProps> = ({
	setComplete,
	fullResources,
	setNotificationContent,
	setSuccess,
	isMobile,
}) => {
	const [resources, setResources] = useState<CloudinaryResource[]>(fullResources);
	const [loading, setLoading] = useState(false);

	const handleSaveOrder = async () => {
		setLoading(true);
		const originalSelectedImages = fullResources.slice(0, 4);
		const newSelectedImages = resources.slice(0, 4);

		const errors: Error[] = [];

		for (let i = 0; i < originalSelectedImages.length; i++) {
			try {
				await removeTagFromResource(originalSelectedImages[i].public_id, `about_${i}`);
			} catch (error) {
				errors.push(error instanceof Error ? error : new Error(String(error)));
			}
		}

		for (let i = 0; i < newSelectedImages.length; i++) {
			try {
				await addTagToResource(newSelectedImages[i].public_id, `about_${i}`);
			} catch (error) {
				errors.push(error instanceof Error ? error : new Error(String(error)));
			}
		}

		// To-Do: I think the issue is with RemoveFromOneResourceAndThenAddToAnother
		// // const determineTagOperations = () => {
		// // 	const changeTag: { publicId: string; newIndex: number; oldPublicId: string }[] = [];
		// // 	const removeTag: { publicId: string; originalIndex: number }[] = [];
		// // 	const addTag: { publicId: string; newIndex: number }[] = [];

		// // 	newSelectedImages.forEach((newImage, index) => {
		// // 		if (
		// // 			originalSelectedImages.includes(newImage) &&
		// // 			index !== originalSelectedImages.indexOf(newImage)
		// // 		) {
		// // 			changeTag.push({
		// // 				publicId: newImage.public_id,
		// // 				newIndex: index,
		// // 				oldPublicId: originalSelectedImages[index].public_id,
		// // 			});
		// // 		} else if (!originalSelectedImages.includes(newImage)) {
		// // 			addTag.push({ publicId: newImage.public_id, newIndex: index });
		// // 		}
		// // 	});
		// // 	originalSelectedImages.forEach((originalImage, index) => {
		// // 		if (!newSelectedImages.includes(originalImage)) {
		// // 			removeTag.push({ publicId: originalImage.public_id, originalIndex: index });
		// // 		}
		// // 	});

		// // 	return { changeTag, removeTag, addTag };
		// // };

		// // const { changeTag, removeTag, addTag } = determineTagOperations();

		// for (let i = 0; i < removeTag.length; i++) {
		// 	try {
		// 		await removeTagFromResource(
		// 			removeTag[i].publicId,
		// 			`about_${removeTag[i].originalIndex}`
		// 		);
		// 	} catch (error) {
		// 		errors.push(error instanceof Error ? error : new Error(String(error)));
		// 	}
		// }

		// for (let i = 0; i < changeTag.length; i++) {
		// 	try {
		// 		await removeFromOneResourceAndThenAddToAnother(
		// 			changeTag[i].oldPublicId,
		// 			changeTag[i].publicId,
		// 			`about_${changeTag[i].newIndex}`
		// 		);
		// 	} catch (error) {
		// 		errors.push(error instanceof Error ? error : new Error(String(error)));
		// 	}
		// }

		// for (let i = 0; i < addTag.length; i++) {
		// 	try {
		// 		await addTagToResource(addTag[i].publicId, `about_${addTag[i].newIndex}`);
		// 	} catch (error) {
		// 		errors.push(error instanceof Error ? error : new Error(String(error)));
		// 	}
		// }

		if (errors.length > 0) {
			const error = new Error(errors.map((error) => error.message).join(" "));
			setNotificationContent({
				key: "error",
				content: error || new Error("Failed to save new order."),
			});
			setSuccess(false);
		} else {
			setNotificationContent({
				key: "string",
				content: "Successfully saved new order.",
			});
			setSuccess(true);
		}

		setComplete(true);
	};

	return (
		<div className="w-[90dvw] text-center px-2 py-6 flex flex-col rounded-sm bg-zinc-50 dark:bg-zinc-600 border border-2 border-slate-400 dark:border-slate-500 shadow-sm shadow-slate-400 dark:shadow-slate-900">
			<div className="text-lg font-semibold">Select Featured Images</div>
			<div className="text-sm">
				Drag your selected four images to the left in the order you want them to appear on
				the About page.
			</div>
			{loading ? (
				<div className="w-full flex justify-center mt-4">
					<LoadingIcon />
				</div>
			) : (
				<>
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
				</>
			)}
		</div>
	);
};

export default AboutImageModal;
