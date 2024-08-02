import { GuitarModelWithSpec } from "@/app/utilities/types";
import { FC, useState } from "react";
import EditableGuitarSpecLayout from "./EditableGuitarSpecLayout";
import Toggle from "@/app/(admin)/components/components/Toggle";
import Uploader from "./Uploader";
import { isVariantGuitarModel } from "@/app/utilities/typeguardFunctions";
import GuitarImageGallery from "./GuitarImageGallery";

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
	const [isSpec, setIsSpec] = useState(true);
	return (
		<>
			<div className="w-full col-span-2">
				<Toggle
					isToggled={isSpec}
					handleToggle={() => setIsSpec((prev) => !prev)}
					optionOne="Specs"
					optionTwo="Images"
					isMobile={isMobile}
					small={false}
				/>
			</div>
			{isSpec ? (
				<EditableGuitarSpecLayout
					models={models}
					selectedTab={selectedTab}
					isMobile={isMobile}
				/>
			) : (
				<>
					<div className="my-4 col-span-2 flex justify-center">
						<Uploader
							tags={
								isVariantGuitarModel(models[selectedTab])
									? [
											models[selectedTab].variantTag,
											models[selectedTab].variantTag.split("_")[0],
									  ]
									: [models[selectedTab].tag]
							}
							isMobile={isMobile}
						/>
					</div>
					<GuitarImageGallery
						tag={
							isVariantGuitarModel(models[selectedTab])
								? models[selectedTab].variantTag
								: models[selectedTab].tag
						}
					/>
				</>
			)}
		</>
	);
};

export default EditableGuitarInfoLayout;
