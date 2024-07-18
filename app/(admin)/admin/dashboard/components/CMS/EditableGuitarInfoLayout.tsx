import { FC } from "react";
import { GuitarSpec, PageContent } from "@prisma/client";
import EditableContent from "./EditableContent";
import { updateGuitarSpec } from "@/app/utilities/databaseFunctions";

interface EditableGuitarInfoLayoutProps {
	guitarSpecs: GuitarSpec[];
	selectedTab: number;
	isMobile: boolean;
}

const EditableGuitarInfoLayout: FC<EditableGuitarInfoLayoutProps> = ({
	guitarSpecs,
	selectedTab,
	isMobile,
}) => {
	return Object.entries(guitarSpecs[selectedTab]).map(([key, value]) => {
		if (
			key === "id" ||
			value === null ||
			value instanceof Date ||
			typeof value === "number"
		)
			return null;
		return (
			<EditableContent
				key={`${key}-${guitarSpecs[selectedTab].id}`}
				contentObj={{ [key]: value }}
				id={guitarSpecs[selectedTab].id}
				isMobile={isMobile}
				updateContentFunction={updateGuitarSpec}
			/>
		);
	});
};

export default EditableGuitarInfoLayout;
