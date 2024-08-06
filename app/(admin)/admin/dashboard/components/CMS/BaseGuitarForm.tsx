import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";
import TextareaInput from "@/app/(admin)/components/components/TextareaInput";
import { createBaseGuitarModel } from "@/app/utilities/databaseFunctions/baseguitar.db";
import { camelToTitleCase } from "@/app/utilities/helpers";
import {
	BaseGuitarNeeds,
	GuitarSpecNeeds,
	GuitarType,
	NotificationContentType,
	VariantGuitarNeeds,
} from "@/app/utilities/types";
import { Dispatch, FC, SetStateAction } from "react";
import { requiredBaseGuitarSpecs } from "../../guitars/constants/AddGuitarConstants";
import Heading from "../components/Heading";

interface BaseGuitarFormProps {
	isMobile: boolean;
	guitarType: GuitarType;
	guitarNeeds: (keyof BaseGuitarNeeds)[];
	content: BaseGuitarNeeds;
	setContent: Dispatch<SetStateAction<BaseGuitarNeeds | VariantGuitarNeeds>>;
	setOpen: Dispatch<SetStateAction<boolean>>;
	setNotificationContent: Dispatch<SetStateAction<NotificationContentType>>;
	setGuitarType: Dispatch<SetStateAction<GuitarType | null>>;
}

const BaseGuitarForm: FC<BaseGuitarFormProps> = ({
	isMobile,
	guitarType,
	guitarNeeds,
	content,
	setContent,
	setOpen,
	setNotificationContent,
	setGuitarType,
}) => {
	const handleClick = async () => {
		const missingFields = requiredBaseGuitarSpecs.filter(
			(field) => !content[field as keyof typeof content]
		);
		if (missingFields.length) {
			const missingFieldsError = new Error(
				`The following fields are required: ${missingFields.join(", ")}`
			);
			missingFieldsError.name = "Missing Fields";
			setOpen(true);
			setNotificationContent({
				key: "error",
				content: missingFieldsError,
			});
		} else {
			const { name, tag, ...guitarSpec } = content;
			for (const key in guitarSpec) {
				if (guitarSpec[key as keyof GuitarSpecNeeds] === "") {
					delete guitarSpec[key as keyof GuitarSpecNeeds];
				}
			}
			const newBaseGuitarModel = await createBaseGuitarModel(name, tag, guitarSpec);
			if (newBaseGuitarModel instanceof Error) {
				setNotificationContent({
					key: "error",
					content: newBaseGuitarModel,
				});
			} else {
				setNotificationContent({
					key: "string",
					content: `Successfully created new base guitar model: ${newBaseGuitarModel.name}`,
				});
			}
			setOpen(true);
			setGuitarType(null);
		}
	};

	return (
		<>
			<Heading title={`New ${guitarType}`} />
			<div className="bg-slate-100 dark:bg-slate-500 grid grid-cols-1 sm:grid-cols-3 rounded-md border-slate-500 dark:border-slate-400 p-4 gap-6">
				{guitarNeeds.map((need) => (
					<div key={need} className="flex flex-col gap-2">
						<label>{camelToTitleCase(need)}</label>
						<TextareaInput
							placeholder={`Enter content...`}
							// To-Do: Get rid of type assertions if I can
							value={content[need as keyof typeof content] || ""}
							onChange={(event) => {
								setContent((prev) => ({ ...prev, [need]: event.target.value }));
							}}
						/>
					</div>
				))}
				<div className="col-span-3 flex justify-center">
					<AdminButtonLink
						handleClick={() => handleClick()}
						text="Submit"
						isMobile={isMobile}
					/>
				</div>
			</div>
		</>
	);
};

export default BaseGuitarForm;
