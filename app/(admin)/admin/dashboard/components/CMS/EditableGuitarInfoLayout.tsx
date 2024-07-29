import {
	deleteGuitarModelSpec,
	getGuitarSpec,
	updateGuitarModelSpec,
} from "@/app/utilities/databaseFunctions/guitarspec.db";
import { isGuitarSpec, isVariantGuitarModel } from "@/app/utilities/typeguardFunctions";
import { GuitarModelWithSpec, NotificationContentType } from "@/app/utilities/types";
import { GuitarSpec } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import NotificationModal from "../notifications/NotificationModal";
import AddNewContent from "./AddNewContent";
import EditableContent from "./EditableContent";
import ToggleGalleryFeature from "./ToggleGalleryFeature";

interface EditableGuitarInfoLayoutProps {
	models: GuitarModelWithSpec[];
	selectedTab: number;
	isMobile: boolean;
}

const EditableGuitarInfoLayout: FC<EditableGuitarInfoLayoutProps> = ({
	models,
	selectedTab,
	isMobile,
}) => {
	const selectedModel = models[selectedTab];
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

	useEffect(() => {
		const unusedSpecs: (keyof GuitarSpec)[] = [];
		const usedSpecs: (keyof GuitarSpec)[] = [];
		Object.entries(specs[selectedTab]).forEach(([key, value]) => {
			if (value === null) {
				unusedSpecs.push(key as keyof GuitarSpec);
			} else if (key === "id" || value instanceof Date || typeof value === "number") {
				return null;
			} else {
				usedSpecs.push(key as keyof GuitarSpec);
			}
		});
		setUnusedSpec(unusedSpecs);
		setUsedSpecs(usedSpecs);
	}, [specs, selectedTab]);

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
					initialToggle={selectedModel.gallery}
					guitarId={selectedModel.id}
					setNotificationContent={setNotificationContent}
					setOpen={setOpen}
				/>
			)}

			{unusedSpec.length > 0 && (
				<AddNewContent
					setNewSpec={setNewSpec}
					newSpec={newSpec}
					unusedSpec={unusedSpec}
					id={specs[selectedTab].id}
					isMobile={isMobile}
					handleAddSpec={handleSpecChange}
				/>
			)}

			{open && (
				<NotificationModal setOpen={setOpen} notificationContent={notificationContent} />
			)}
		</>
	);
};

export default EditableGuitarInfoLayout;
