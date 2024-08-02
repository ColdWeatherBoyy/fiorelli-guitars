import { getAllVariantGuitarModels } from "@/app/utilities/databaseFunctions/variantguitar.db";
import { useDeviceType } from "@/app/utilities/hooks.server";
import SelectEditableLayout from "../../../components/CMS/SelectableEditableLayout";
import SubTitle from "../../../components/components/SubTitle";

const AllVariantModels = async () => {
	const isMobile = useDeviceType();
	const variantGuitarModels = await getAllVariantGuitarModels();

	if (variantGuitarModels instanceof Error) {
		throw variantGuitarModels;
	}

	const titles = variantGuitarModels.guitarModelsWithSpecs.map(
		(guitar) => `${guitar.name}, ${guitar.colorScheme}`
	);

	// To-Do: Do Something with guitarModelsWithoutSpecs
	const guitarModelsWithSpecs = variantGuitarModels.guitarModelsWithSpecs;

	return (
		<>
			<SubTitle title="Variant Models" />
			<SelectEditableLayout
				content={guitarModelsWithSpecs}
				titles={titles}
				isMobile={isMobile}
			/>
		</>
	);
};

export default AllVariantModels;
