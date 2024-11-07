import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";
import {
	getAllGalleryVariantGuitarModels,
	reorderGalleryVariantGuitars,
} from "@/app/utilities/databaseFunctions/variantguitar.db";
import { isVariantGuitarModelArray } from "@/app/utilities/typeguardFunctions";
import {
	NotificationContentType,
	VariantGuitarModelWithSpec,
} from "@/app/utilities/types";
import { Reorder } from "framer-motion";
import { FC, useState } from "react";
import NotificationModal from "../notifications/NotificationModal";

interface GalleryOrderProps {
	galleryGuitars: VariantGuitarModelWithSpec[];
	isMobile: boolean;
}

export const GalleryOrder: FC<GalleryOrderProps> = ({ galleryGuitars, isMobile }) => {
	const [open, setOpen] = useState(false);
	const [notificationContent, setNotificationContent] = useState<NotificationContentType>(
		{
			key: "string",
			content: "",
		}
	);
	const [success, setSuccess] = useState(false);

	const [loading, setLoading] = useState(false);
	const [order, setOrder] = useState(galleryGuitars);
	const [reordering, setReordering] = useState(false);

	const handleMouseDown = () => {
		setReordering(true);
	};
	const handleMouseUp = () => {
		setReordering(false);
	};

	const saveOrder = async () => {
		setLoading(true);

		const reorderError = new Error(
			"Failed to update gallery order. If problem persists, please contact site admin."
		);
		reorderError.name = "Can't Update";

		try {
			const guitarsToUpdate = order.reduce<VariantGuitarModelWithSpec[]>(
				(acc, guitar, index) => {
					if (guitar.galleryOrder !== index) {
						acc.push({ ...guitar, galleryOrder: index });
					}
					return acc;
				},
				[]
			);
			const updatedGuitars = await reorderGalleryVariantGuitars(guitarsToUpdate);
			if (!isVariantGuitarModelArray(updatedGuitars)) {
				setNotificationContent({
					key: "error",
					content: updatedGuitars,
				});
			} else {
				setSuccess(true);
				setNotificationContent({
					key: "string",
					content: "Gallery order successfully updated.",
				});
			}
		} catch (error) {
			console.error(error);
			setNotificationContent({
				key: "error",
				content: (error as Error) || reorderError,
			});
		}
		setOpen(true);
		setLoading(false);
	};

	const onSuccess = async () => {
		const galleryGuitars = await getAllGalleryVariantGuitarModels();
		if (galleryGuitars instanceof Error) {
			console.error(galleryGuitars);
			return;
		}
		setOrder(galleryGuitars.guitarModelsWithSpecs);
	};

	return (
		<>
			<div
				className={`w-full flex flex-col justify-center items-center p-3 bg-zinc-200 dark:bg-slate-400 border-2 border-slate-400 dark:border-slate-300 rounded-sm shadow-sm shadow-slate-400 dark:shadow-slate-900 gap-2 ${
					loading && "opacity-50 cursor-not-allowed "
				}`}
			>
				<div className="text-lg font-semibold mb-3">Gallery Order</div>
				<Reorder.Group
					axis="y"
					onReorder={setOrder}
					values={order}
					className="flex flex-col gap-2"
				>
					{order.map((guitar, index) => (
						<Reorder.Item key={guitar.id} value={guitar}>
							<div key={index}>
								<div
									onMouseDown={handleMouseDown}
									onMouseUp={handleMouseUp}
									className={`border border-slate-400 dark:border-slate-500 rounded-md p-2 flex flex-row items-center gap-5 bg-zinc-50 dark:bg-zinc-600 ${
										reordering ? "cursor-grabbing" : "cursor-grab"
									}`}
								>
									<div className="font-bold text-lg">{index + 1}</div>
									<div>
										{guitar.name}, {guitar.distinction}
									</div>
								</div>
							</div>
						</Reorder.Item>
					))}
				</Reorder.Group>
				<AdminButtonLink
					text="Save Order"
					isMobile={isMobile}
					handleClick={() => saveOrder()}
				/>
			</div>
			{open && (
				<NotificationModal
					setOpen={setOpen}
					notificationContent={notificationContent}
					onSuccess={success ? onSuccess : undefined}
				/>
			)}
		</>
	);
};
