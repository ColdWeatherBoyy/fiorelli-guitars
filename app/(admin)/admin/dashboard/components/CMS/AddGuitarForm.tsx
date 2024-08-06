"use client";

import {
	isArrayOfBaseGuitarNeedKeys,
	isArrayOfVariantGuitarNeedKeys,
	isBaseGuitarNeeds,
	isVariantGuitarNeeds,
} from "@/app/utilities/typeguardFunctions";
import {
	BaseGuitarNeeds,
	GuitarType,
	NotificationContentType,
	VariantGuitarNeeds,
} from "@/app/utilities/types";
import { FC, useEffect, useState } from "react";
import {
	baseGuitarDefault,
	VariantGuitarDefault,
} from "../../guitars/constants/AddGuitarConstants";
import Dropdown from "../components/Dropdown";
import NotificationModal from "../notifications/NotificationModal";
import BaseGuitarForm from "./BaseGuitarForm";
import VariantGuitarForm from "./VariantGuitarForm";

interface AddGuitarFormProps {
	isMobile: boolean;
}

const AddGuitarForm: FC<AddGuitarFormProps> = ({ isMobile }) => {
	const [guitarType, setGuitarType] = useState<GuitarType | null>(null);
	const [guitarNeeds, setGuitarNeeds] = useState<
		(keyof BaseGuitarNeeds)[] | (keyof VariantGuitarNeeds)[]
	>([]);
	const [content, setContent] = useState<BaseGuitarNeeds | VariantGuitarNeeds>(
		baseGuitarDefault
	);
	const [open, setOpen] = useState(false);
	const [notificationContent, setNotificationContent] = useState<NotificationContentType>(
		{
			key: "string",
			content: "",
		}
	);

	useEffect(() => {
		// To-Do: Get rid of type assertions if I can
		setGuitarNeeds(
			guitarType === GuitarType.base
				? (Object.keys(baseGuitarDefault) as (keyof BaseGuitarNeeds)[])
				: (Object.keys(VariantGuitarDefault) as (keyof VariantGuitarNeeds)[])
		);
		setContent(guitarType === GuitarType.base ? baseGuitarDefault : VariantGuitarDefault);
	}, [guitarType]);

	// useEffect(() => {
	// 	console.log(content);
	// }, [content]);

	return (
		<>
			<Dropdown
				key="guitarType"
				setValue={setGuitarType}
				value={guitarType || ""}
				defaultOption="Select a type"
				options={[GuitarType.base, GuitarType.variant]}
			/>
			{guitarType === GuitarType.base &&
				isBaseGuitarNeeds(content) &&
				isArrayOfBaseGuitarNeedKeys(guitarNeeds) && (
					<BaseGuitarForm
						isMobile={isMobile}
						guitarType={guitarType}
						guitarNeeds={guitarNeeds}
						content={content}
						setContent={setContent}
						setOpen={setOpen}
						setNotificationContent={setNotificationContent}
						setGuitarType={setGuitarType}
					/>
				)}
			{guitarType === GuitarType.variant &&
				isVariantGuitarNeeds(content) &&
				isArrayOfVariantGuitarNeedKeys(guitarNeeds) && (
					<VariantGuitarForm
						isMobile={isMobile}
						guitarType={guitarType}
						guitarNeeds={guitarNeeds}
						content={content}
						setContent={setContent}
						setOpen={setOpen}
						setNotificationContent={setNotificationContent}
						setGuitarType={setGuitarType}
					/>
				)}
			{open && (
				<NotificationModal setOpen={setOpen} notificationContent={notificationContent} />
			)}
		</>
	);
};

export default AddGuitarForm;

// const handleClick = async () => {
// 	const missingFields =
// 		guitarType === GuitarType.base
// 			? requiredBaseGuitarSpecs.filter(
// 					(field) => !content[field as keyof typeof content]
// 			  )
// 			: requiredVariantGuitarSpecs.filter(
// 					(field) => !content[field as keyof typeof content]
// 			  );
// 	if (missingFields.length) {
// 		const missingFieldsError = new Error(
// 			`The following fields are required: ${missingFields.join(", ")}`
// 		);
// 		missingFieldsError.name = "Missing Fields";
// 		setOpen(true);
// 		setNotificationContent({
// 			key: "error",
// 			content: missingFieldsError,
// 		});
// 	} else {
// 		if (isBaseGuitarNeeds(content)) {
// 			const { name, tag, ...guitarSpec } = content;
// 			for (const key in guitarSpec) {
// 				if (guitarSpec[key as keyof GuitarSpecNeeds] === "") {
// 					delete guitarSpec[key as keyof GuitarSpecNeeds];
// 				}
// 			}
// 			const newBaseGuitarModel = await createBaseGuitarModel(name, tag, guitarSpec);
// 			if (newBaseGuitarModel instanceof Error) {
// 				setNotificationContent({
// 					key: "error",
// 					content: newBaseGuitarModel,
// 				});
// 			} else {
// 				setNotificationContent({
// 					key: "string",
// 					content: `Successfully created new base guitar model: ${newBaseGuitarModel.name}`,
// 				});
// 			}
// 			setOpen(true);
// 			setGuitarType(null);
// 			// } else {
// 			// 	const { name, variantTag, colorScheme, ...guitarSpec } = content;
// 			// 	for (const key in guitarSpec) {
// 			// 		if (guitarSpec[key as keyof GuitarSpecNeeds] === "") {
// 			// 			delete guitarSpec[key as keyof GuitarSpecNeeds];
// 			// 		}
// 			// 	}
// 		}
// 	}
// };
