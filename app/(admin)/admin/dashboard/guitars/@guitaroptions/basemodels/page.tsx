import { getAllBaseGuitarModels } from "@/app/utilities/databaseFunctions/baseguitar.db";
import { useDeviceType } from "@/app/utilities/hooks.server";
import SelectEditableLayout from "../../../components/CMS/SelectableEditableLayout";
import SubTitle from "../../../components/components/SubTitle";

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
			<SubTitle title="Base Guitar Models" />
			<SelectEditableLayout
				content={guitarModelsWithSpecs}
				titles={titles}
				isMobile={isMobile}
			/>
		</>
	);
};

export default BaseGuitarModels;
