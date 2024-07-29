import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import { getAllBaseGuitarModels } from "@/app/utilities/databaseFunctions/baseguitar.db";
import { useDeviceType } from "@/app/utilities/hooks.server";
import { BaseGuitarModelWithSpec } from "@/app/utilities/types";
import SelectEditableLayout from "../../../components/CMS/SelectableEditableLayout";

const BaseGuitarModels = async () => {
	const isMobile = useDeviceType();
	const baseGuitarModels = await getAllBaseGuitarModels();
	if (baseGuitarModels instanceof Error) {
		throw baseGuitarModels;
	}

	const titles = baseGuitarModels.guitarModelsWithSpecs.map((guitar) => guitar.name);

	// To-Do: Do Something with guitarModelsWithoutSpecs
	const guitarModelsWithSpecs = baseGuitarModels.guitarModelsWithSpecs;

	return (
		<>
			<Title title="Base Guitar Models" />
			<SelectEditableLayout
				content={guitarModelsWithSpecs}
				titles={titles}
				isMobile={isMobile}
			/>
		</>
	);
};

export default BaseGuitarModels;
