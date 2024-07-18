import { FC } from "react";
import { PageContent } from "@prisma/client";
import EditableContent from "./EditableContent";
import { updateContentBlock } from "@/app/utilities/databaseFunctions";

interface EditableContentLayoutProps {
	pageContentData: PageContent[];
	selectedTab: number;
	isMobile: boolean;
}

const EditableContentLayout: FC<EditableContentLayoutProps> = ({
	pageContentData,
	selectedTab,
	isMobile,
}) => {
	return Object.entries(pageContentData[selectedTab]).map(([key, value]) => {
		if (
			key === "id" ||
			value === null ||
			value instanceof Date ||
			typeof value === "number"
		)
			return null;
		if (Array.isArray(value)) {
			const bodies = value.map((item, index) => ({
				[`body${value.length > 1 ? ` ${index + 1}` : ""}`]: item,
			}));

			return bodies.map((content, index) => (
				<EditableContent
					key={`${key}-${pageContentData[selectedTab].id}-${index}`}
					contentObj={content}
					id={pageContentData[selectedTab].id}
					isMobile={isMobile}
					updateContentFunction={updateContentBlock}
				/>
			));
		} else {
			return (
				<EditableContent
					key={`${key}-${pageContentData[selectedTab].id}`}
					contentObj={{ [key]: value }}
					id={pageContentData[selectedTab].id}
					isMobile={isMobile}
					updateContentFunction={updateContentBlock}
				/>
			);
		}
	});
};
export default EditableContentLayout;
