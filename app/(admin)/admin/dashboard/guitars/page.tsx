import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import { getAllGuitarSpecs } from "@/app/utilities/databaseFunctions";
import { useDeviceType } from "@/app/utilities/hooks.server";
import SelectEditableLayout from "../components/CMS/SelectableEditableLayout";
import { GuitarSpec } from "@prisma/client";

const GuitarInfo = async () => {
	const isMobile = useDeviceType();
	const guitarSpecs = await getAllGuitarSpecs();
	if (guitarSpecs instanceof Error) {
		throw guitarSpecs;
	}

	const titlesArray = guitarSpecs.map((guitar) => guitar.name);

	return (
		<>
			<Title title="Guitars" />
			<SelectEditableLayout
				content={guitarSpecs}
				titlesArray={titlesArray}
				isMobile={isMobile}
			/>
		</>
	);
};

export default GuitarInfo;
