import Title from "@/app/(admin)/components/Title";
import { getPageContent } from "@/app/utilities/databaseFunctions";
import { getContentBlocks } from "@/app/utilities/helpers";
import { ContentBlockType } from "@/app/utilities/types";
import { useState } from "react";
import EditablePageContent from "./EditablePageContent";

const SiteContent = async () => {
	const homePageContent = await getPageContent("HomePage");
	// const aboutContent = await getPageContent("About");
	// const contactContent = await getPageContent("Contact");

	const homeContentBlocks = getContentBlocks(homePageContent.versions[0]);

	return (
		<>
			<Title title="Site Content" />
			<EditablePageContent contentBlocks={homeContentBlocks} />
		</>
	);
};

export default SiteContent;
