import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import { getGuitarSpecs } from "@/app/utilities/databaseFunctions";
import { useDeviceType } from "@/app/utilities/hooks.server";
import { GuitarSpec } from "@prisma/client";
import SelectEditableLayout from "../components/CMS/SelectableEditableLayout";

const GuitarInfo = async () => {
	const isMobile = useDeviceType();
	const EJGuitarSpecs = await getGuitarSpecs("EJ_Guitar");
	if (EJGuitarSpecs instanceof Error) {
		throw EJGuitarSpecs;
	}
	const SPGuitarSpecs = await getGuitarSpecs("SP_Guitar");
	if (SPGuitarSpecs instanceof Error) {
		throw SPGuitarSpecs;
	}

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
