import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";
import { getAllVariantGuitarModels } from "@/app/utilities/databaseFunctions/variantguitar.db";
import { useDeviceType } from "@/app/utilities/hooks.server";
import SelectEditableLayout from "../../../components/CMS/SelectableEditableLayout";

const AllVariantModels = async () => {
	const isMobile = useDeviceType();
	const variantModels = await getAllVariantGuitarModels();
	if (variantModels instanceof Error) {
		throw variantModels;
	}

	const titlesArray = variantModels.map((guitar) => {
		return `${guitar.name}, ${guitar.colorScheme}`;
	});

	const guitarSpecs = variantModels.map((guitar) => {
		return guitar.guitarSpec;
	});

	return (
		<>
			<Title title="Variant Models" />
			<SelectEditableLayout
				content={guitarSpecs}
				titlesArray={titlesArray}
				isMobile={isMobile}
			/>
		</>
	);
};

export default AllVariantModels;
