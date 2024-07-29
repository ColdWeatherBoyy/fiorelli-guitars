import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";
import { getAllVariantGuitarModels } from "@/app/utilities/databaseFunctions/variantguitar.db";
import { useDeviceType } from "@/app/utilities/hooks.server";
import SelectEditableLayout from "../../../components/CMS/SelectableEditableLayout";
import { GuitarSpec, VariantGuitarModel } from "@prisma/client";

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

	return (
		<>
			<Title title="Variant Models" />
			<SelectEditableLayout
				content={variantGuitarModels.guitarModelsWithSpecs}
				titles={titles}
				isMobile={isMobile}
			/>
		</>
	);
};

export default AllVariantModels;
