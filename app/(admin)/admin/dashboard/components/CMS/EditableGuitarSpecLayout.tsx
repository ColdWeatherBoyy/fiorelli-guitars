import {
	deleteGuitarModelSpec,
	getGuitarSpec,
	updateGuitarModelSpec,
} from "@/app/utilities/databaseFunctions/guitarspec.db";
import {
	decrementHigherGalleryOrder,
	getAllGalleryVariantGuitarModels,
	getVariantGuitarModel,
	updateVariantGuitar,
} from "@/app/utilities/databaseFunctions/variantguitar.db";
import { isGuitarSpec, isVariantGuitarModel } from "@/app/utilities/typeguardFunctions";
import { GuitarModelWithSpec, NotificationContentType } from "@/app/utilities/types";
import { GuitarSpec } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import NotificationModal from "../notifications/NotificationModal";
import EditableContent from "./EditableContent";
import ToggleGalleryFeature from "./ToggleGalleryFeature";
import UpdateUnusedSpec from "./UpdateUnusedSpec";
import AdminModalWrapper from "../notifications/AdminModalWrapper";

interface EditableGuitarSpecLayoutProps {
	models: GuitarModelWithSpec[];
	selectedTab: number;
	isMobile: boolean;
}

const EditableGuitarSpecLayout: FC<EditableGuitarSpecLayoutProps> = ({
	models,
	selectedTab,
	isMobile,
}) => {
	const [selectedModel, setSelectedModel] = useState(models[selectedTab]);
	const [isGallery, setIsGallery] = useState(
		isVariantGuitarModel(selectedModel) ? selectedModel.gallery : false
	);
	const [specs, setSpecs] = useState<GuitarSpec[]>(
		models.map((model) => model.guitarSpec)
	);
	const [unusedSpec, setUnusedSpec] = useState<(keyof GuitarSpec)[]>([]);
	const [usedSpecs, setUsedSpecs] = useState<(keyof GuitarSpec)[]>([]);
	const [newSpec, setNewSpec] = useState<string>("");
	const [open, setOpen] = useState(false);
	const [notificationContent, setNotificationContent] = useState<NotificationContentType>(
		{
			key: "string",
			content: "",
		}
	);

	// When Selected Tab changes, reset unusedSpecs, usedSpecs, and selectedModel
	useEffect(() => {
		const unusedSpecs: (keyof GuitarSpec)[] = [];
		const usedSpecs: (keyof GuitarSpec)[] = [];
		Object.entries(specs[selectedTab]).forEach(([key, value]) => {
			if (
				key === "id" ||
				value instanceof Date ||
				typeof value === "number" ||
				key.includes("GuitarModelId")
			) {
				return null;
			} else if (value === null) {
				// To-Do: Type assertion
				unusedSpecs.push(key as keyof GuitarSpec);
			} else {
				// To-Do: Type assertion
				usedSpecs.push(key as keyof GuitarSpec);
			}
		});
		setUnusedSpec(unusedSpecs);
		setUsedSpecs(usedSpecs);
		setSelectedModel(models[selectedTab]);
	}, [models, specs, selectedTab]);

	// When SelectedModel changes, update isGallery state
	useEffect(() => {
		setIsGallery(isVariantGuitarModel(selectedModel) ? selectedModel.gallery : false);
	}, [selectedModel]);

	// Using database to update guitar model specs, retriggering component to render when specs state changes
	const handleSpecChange = async () => {
		const newSpecs = await getGuitarSpec(specs[selectedTab].id);
		if (!isGuitarSpec(newSpecs)) {
			setNotificationContent({
				key: "error",
				content: {
					name: newSpecs.name,
					message: "There was an error updating your page. Please refresh and try again.",
					cause: newSpecs.cause,
				},
			});
			setOpen(true);
			return;
		}
		setSpecs((prevSpecs) => {
			const newSpecsArray = [...prevSpecs];
			newSpecsArray[selectedTab] = newSpecs;
			return newSpecsArray;
		});
		setNewSpec("");
	};

	// Update the gallery boolean for the selected guitar model
	const handleGalleryToggle = async () => {
		if (!isVariantGuitarModel(selectedModel)) return;

		const addGalleryVariant = async () => {
			const currentGalleryModels = await getAllGalleryVariantGuitarModels();
			if (currentGalleryModels instanceof Error) {
				return currentGalleryModels;
			}

			const numberOfGalleryModels = currentGalleryModels.guitarModelsWithSpecs.length;
			return await updateVariantGuitar(
				selectedModel.id,
				"gallery",
				!isGallery,
				"galleryOrder",
				numberOfGalleryModels
			);
		};

		const removeGalleryVariant = async () => {
			const adjustedGuitar = await getVariantGuitarModel(selectedModel.variantTag);
			if (!isVariantGuitarModel(adjustedGuitar)) {
				return adjustedGuitar;
			}
			const removedOrder = adjustedGuitar.galleryOrder;
			if (removedOrder === null) {
				return {
					name: "No Gallery Order",
					message: "This model does not have a gallery order number.",
				};
			}

			const updatedGuitarModel = await updateVariantGuitar(
				selectedModel.id,
				"gallery",
				!isGallery,
				"galleryOrder",
				null
			);
			if (updatedGuitarModel instanceof Error) {
				return updatedGuitarModel;
			}

			const adjustedVariants = await decrementHigherGalleryOrder(removedOrder);
			if (adjustedVariants instanceof Error) {
				return adjustedVariants;
			}

			return updatedGuitarModel;
		};

		let updatedGuitarModel;
		// if isGallery is currently true, then we are removing the gallery feature and need to update the order number for remaining Gallery models
		// if isGallery is currently false, then we are adding the gallery feature and need to add a gallery number which is the number of gallery models
		if (!isGallery) {
			updatedGuitarModel = await addGalleryVariant();
		} else {
			updatedGuitarModel = await removeGalleryVariant();
		}

		if (!isVariantGuitarModel(updatedGuitarModel)) {
			setNotificationContent({ key: "error", content: updatedGuitarModel });
		} else {
			setNotificationContent({ key: "string", content: "Gallery feature updated!" });
			setIsGallery((prev) => !prev);
		}
		setOpen(true);
		return;
	};

	return (
		<>
			{usedSpecs.map((spec) => {
				const contentValue = specs[selectedTab][spec];
				if (typeof contentValue !== "string") return null;
				return (
					<EditableContent
						key={`${spec}-${specs[selectedTab].id}`}
						contentObj={{ [spec]: contentValue }}
						id={specs[selectedTab].id}
						isMobile={isMobile}
						updateContentFunction={updateGuitarModelSpec}
						deleteContentFunction={deleteGuitarModelSpec}
						onSuccess={handleSpecChange}
					/>
				);
			})}

			{isVariantGuitarModel(selectedModel) && (
				<ToggleGalleryFeature
					isToggled={isGallery}
					handleToggle={handleGalleryToggle}
					isMobile={isMobile}
				/>
			)}

			{unusedSpec.length > 0 && (
				<UpdateUnusedSpec
					setNewSpec={setNewSpec}
					newSpec={newSpec}
					unusedSpec={unusedSpec}
					id={specs[selectedTab].id}
					isMobile={isMobile}
					handleAddSpec={handleSpecChange}
				/>
			)}

			{open && (
				<AdminModalWrapper setOpen={setOpen}>
					<NotificationModal notificationContent={notificationContent} />
				</AdminModalWrapper>
			)}
		</>
	);
};

export default EditableGuitarSpecLayout;
