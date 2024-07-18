import SelectEditableLayout from "@/app/(admin)/components/CMS/SelectableEditableLayout";
import Title from "@/app/(admin)/components/Title";
import { getGuitarSpecs } from "@/app/utilities/databaseFunctions";
import { useDeviceType } from "@/app/utilities/hooks.server";
import { GuitarSpec } from "@prisma/client";

const GuitarInfo = async () => {
	const isMobile = useDeviceType();
	const EJGuitarSpecs = await getGuitarSpecs("EJ_Guitar");
	const SPGuitarSpecs = await getGuitarSpecs("SP_Guitar");
	if (!EJGuitarSpecs || !SPGuitarSpecs) return null;

	const guitarSpecs: GuitarSpec[] = [EJGuitarSpecs, SPGuitarSpecs];

	const titlesArray = [EJGuitarSpecs.name, SPGuitarSpecs.name];

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
