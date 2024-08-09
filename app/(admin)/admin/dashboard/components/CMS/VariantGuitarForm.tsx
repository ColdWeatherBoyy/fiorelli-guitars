import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";
import TextareaInput from "@/app/(admin)/components/components/TextareaInput";
import { getAllBaseGuitarModels } from "@/app/utilities/databaseFunctions/baseguitar.db";
import { createVariantGuitarModel } from "@/app/utilities/databaseFunctions/variantguitar.db";
import { camelToTitleCase } from "@/app/utilities/helpers";
import {
	BaseGuitarModelWithSpec,
	BaseGuitarNeeds,
	GuitarSpecNeeds,
	GuitarType,
	NotificationContentType,
	VariantGuitarNeeds,
} from "@/app/utilities/types";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { requiredVariantGuitarSpecs } from "../../guitars/constants/AddGuitarConstants";
import Dropdown from "../components/Dropdown";
import Heading from "../components/Heading";
import AnimateWrapper from "@/app/components/AnimateWrapper";

interface VariantGuitarFormProps {
	isMobile: boolean;
	guitarType: GuitarType;
	guitarNeeds: (keyof VariantGuitarNeeds)[];
	content: VariantGuitarNeeds;
	setContent: Dispatch<SetStateAction<BaseGuitarNeeds | VariantGuitarNeeds>>;
	setOpen: Dispatch<SetStateAction<boolean>>;
	setNotificationContent: Dispatch<SetStateAction<NotificationContentType>>;
	setGuitarType: Dispatch<SetStateAction<GuitarType | null>>;
}

const VariantGuitarForm: FC<VariantGuitarFormProps> = ({
	isMobile,
	guitarType,
	guitarNeeds,
	content,
	setContent,
	setOpen,
	setNotificationContent,
	setGuitarType,
}) => {
	const [templateBaseGuitarArr, setTemplateBaseGuitarArr] = useState<
		BaseGuitarModelWithSpec[] | null
	>(null);
	const [selectedTemplateName, setSelectedTemplateName] = useState<string>("");
	const [selectedTemplate, setSelectedTemplate] =
		useState<BaseGuitarModelWithSpec | null>(null);

	useEffect(() => {
		if (guitarType === GuitarType.variant) {
			const handleGetAllBaseGuitarModels = async () => {
				const allBaseGuitarModels = await getAllBaseGuitarModels();
				if (allBaseGuitarModels instanceof Error) {
					setNotificationContent({
						key: "error",
						content: allBaseGuitarModels,
					});
					setOpen(true);
					setGuitarType(null);
				} else {
					setTemplateBaseGuitarArr(allBaseGuitarModels.guitarModelsWithSpecs);
				}
			};

			handleGetAllBaseGuitarModels();
		}
	}, [guitarType, setGuitarType, setNotificationContent, setOpen]);

	useEffect(() => {
		if (selectedTemplateName) {
			const selectedTemplate = templateBaseGuitarArr?.find(
				(baseGuitar) => baseGuitar.name === selectedTemplateName
			);
			setSelectedTemplate(selectedTemplate || null);
		}
	}, [selectedTemplateName, templateBaseGuitarArr]);

	useEffect(() => {
		if (selectedTemplate) {
			const newContent = {
				name: selectedTemplate.name,
				variantTag: `${selectedTemplate.tag}_${content.distinction.replace(
					/[^a-zA-Z0-9]/g,
					""
				)}`,
				colorScheme: content.colorScheme,
				distinction: content.distinction,
				body: selectedTemplate.guitarSpec.body,
				neck: selectedTemplate.guitarSpec.neck,
				fingerboard: selectedTemplate.guitarSpec.fingerboard,
				fingerboardRadius: selectedTemplate.guitarSpec.fingerboardRadius,
				scaleLength: selectedTemplate.guitarSpec.scaleLength,
				fretMarkers: selectedTemplate.guitarSpec.fretMarkers,
				neckPickup: selectedTemplate.guitarSpec.neckPickup,
				middlePickup: selectedTemplate.guitarSpec.middlePickup || "",
				bridgePickup: selectedTemplate.guitarSpec.bridgePickup || "",
				pickupSwitch: selectedTemplate.guitarSpec.pickupSwitch || "",
				bridge: selectedTemplate.guitarSpec.bridge,
				vibrato: selectedTemplate.guitarSpec.vibrato || "",
				tuners: selectedTemplate.guitarSpec.tuners,
				knobs: selectedTemplate.guitarSpec.knobs || "",
				customFeatures: selectedTemplate.guitarSpec.customFeatures || "",
			};
			setContent(newContent);
		}
	}, [selectedTemplate, setContent, content.distinction, content.colorScheme]);

	useEffect(() => {
		setContent((prev) => ({
			...prev,
			// To-Do: Get rid of type assertion
			variantTag: `${selectedTemplate?.tag}_${content.distinction.replace(
				/[^a-zA-Z0-9]/g,
				""
			)}`,
		}));
	}, [content.distinction, setContent, selectedTemplate?.tag]);

	const handleClick = async () => {
		const missingFields = requiredVariantGuitarSpecs.filter(
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
		} else if (!selectedTemplate) {
			const noTemplateError = new Error("No base guitar model selected.");
			noTemplateError.name = "No Template Selected";
			setNotificationContent({
				key: "error",
				content: noTemplateError,
			});
			setOpen(true);
		} else {
			const { name, variantTag, colorScheme, distinction, ...guitarSpec } = content;
			const { id: baseModelId } = selectedTemplate;
			for (const key in guitarSpec) {
				if (guitarSpec[key as keyof GuitarSpecNeeds] === "") {
					delete guitarSpec[key as keyof GuitarSpecNeeds];
				}
			}
			const newVariantGuitarModelModel = await createVariantGuitarModel(
				name,
				variantTag,
				colorScheme,
				distinction,
				baseModelId,
				guitarSpec
			);
			if (newVariantGuitarModelModel instanceof Error) {
				setNotificationContent({
					key: "error",
					content: newVariantGuitarModelModel,
				});
			} else {
				setNotificationContent({
					key: "string",
					content: `Successfully created new variant guitar model: ${newVariantGuitarModelModel.name}`,
				});
			}
			setOpen(true);
			setGuitarType(null);
		}
	};

	return (
		<>
			<AnimateWrapper>
				<Dropdown
					value={selectedTemplate?.name || ""}
					setValue={setSelectedTemplateName}
					defaultOption={templateBaseGuitarArr ? "Select a base guitar" : "Loading..."}
					options={templateBaseGuitarArr?.map((baseGuitar) => baseGuitar.name) || []}
				/>
			</AnimateWrapper>
			{selectedTemplate && (
				<AnimateWrapper>
					<div className="flex flex-col gap-4">
						<Heading title={`New ${guitarType}`} />
						<div className="bg-slate-100 dark:bg-slate-500 grid grid-cols-1 sm:grid-cols-3 rounded-md border-slate-500 dark:border-slate-400 p-4 gap-6">
							{guitarNeeds.map((need) => (
								<div key={need} className="flex flex-col gap-2">
									<label>{camelToTitleCase(need)}</label>
									{need === "variantTag" || need === "name" ? (
										<TextareaInput
											placeholder={``}
											disabled
											// To-Do: Get rid of type assertion
											value={content[need as keyof typeof content] || ""}
											onChange={(event) => {
												setContent((prev) => ({ ...prev, [need]: event.target.value }));
											}}
										/>
									) : (
										<TextareaInput
											placeholder={`Enter content...`}
											// To-Do: Get rid of type assertion
											value={content[need as keyof typeof content] || ""}
											onChange={(event) => {
												setContent((prev) => ({ ...prev, [need]: event.target.value }));
											}}
										/>
									)}
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
					</div>
				</AnimateWrapper>
			)}
		</>
	);
};

export default VariantGuitarForm;
