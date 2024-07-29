import Toggle from "@/app/(admin)/components/components/Toggle";
import { updateVariantGuitar } from "@/app/utilities/databaseFunctions/variantguitar.db";
import { isVariantGuitarModel } from "@/app/utilities/typeguardFunctions";
import { NotificationContentType } from "@/app/utilities/types";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface ToggleGalleryFeatureProps {
	initialToggle: boolean;
	guitarId: number;
	setNotificationContent: Dispatch<SetStateAction<NotificationContentType>>;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const ToggleGalleryFeature: FC<ToggleGalleryFeatureProps> = ({
	initialToggle,
	guitarId,
	setNotificationContent,
	setOpen,
}) => {
	const [galleryToggle, setGalleryToggle] = useState(initialToggle);

	const handleUpdate = async () => {
		const updatedGuitarModel = await updateVariantGuitar(
			guitarId,
			"gallery",
			galleryToggle
		);

		if (!isVariantGuitarModel(updatedGuitarModel)) {
			setNotificationContent({ key: "error", content: updatedGuitarModel });
		} else {
			setNotificationContent({ key: "string", content: "Gallery feature updated!" });
			setGalleryToggle(!galleryToggle);
		}

		setOpen(true);
	};

	const handleToggle = () => {
		handleUpdate();
	};

	return (
		<div className="flex flex-col gap-2 p-2 text-center">
			<div className="underline">Feature Variant in Gallery?</div>
			<Toggle
				toggled={galleryToggle}
				handleToggle={handleToggle}
				optionOne="Yes"
				optionTwo="No"
			/>
		</div>
	);
};

export default ToggleGalleryFeature;
