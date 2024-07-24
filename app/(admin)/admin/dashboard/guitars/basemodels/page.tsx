import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import { getAllBaseGuitarModels } from "@/app/utilities/databaseFunctions/baseguitar.db";
import { useDeviceType } from "@/app/utilities/hooks.server";
import SelectEditableLayout from "../../components/CMS/SelectableEditableLayout";

const BaseGuitarModels = async () => {
	const isMobile = useDeviceType();
	const baseGuitarModels = await getAllBaseGuitarModels();
	if (baseGuitarModels instanceof Error) {
		throw baseGuitarModels;
	}

	const titlesArray = baseGuitarModels.map((guitar) => guitar.name);

	const guitarSpecs = baseGuitarModels.map((guitar) => {
		return guitar.guitarSpec;
	});

	return (
		<>
			<Title title="Base Guitar Models" />
			<SelectEditableLayout
				content={guitarSpecs}
				titlesArray={titlesArray}
				isMobile={isMobile}
			/>
		</>
	);
};

export default BaseGuitarModels;
