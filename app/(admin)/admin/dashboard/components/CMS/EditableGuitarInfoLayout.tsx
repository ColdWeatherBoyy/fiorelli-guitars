import Toggle from "@/app/(admin)/components/components/Toggle";
import {
	isVariantGuitarModel,
	isVariantGuitarModelWithSpec,
} from "@/app/utilities/typeguardFunctions";
import { GuitarModelWithSpec } from "@/app/utilities/types";
import { FC, useState } from "react";
import EditableGuitarSpecLayout from "./EditableGuitarSpecLayout";
import GuitarImageGallery from "./GuitarImageGallery";
import Uploader from "./Uploader";

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
	const [updateCount, setUpdateCount] = useState(0);

	return (
		<>
			<div className="w-full col-span-2 mt-2">
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
								isVariantGuitarModelWithSpec(models[selectedTab])
									? [
											models[selectedTab].variantTag,
											models[selectedTab].variantTag.split("_")[0],
									  ]
									: [models[selectedTab].tag]
							}
							setUpdateCount={setUpdateCount}
							isMobile={isMobile}
						/>
					</div>
					<GuitarImageGallery
						updateCount={updateCount}
						setUpdateCount={setUpdateCount}
						tag={
							isVariantGuitarModel(models[selectedTab])
								? models[selectedTab].variantTag
								: models[selectedTab].tag
						}
						isMobile={isMobile}
					/>
				</>
			)}
		</>
	);
};

export default EditableGuitarInfoLayout;
