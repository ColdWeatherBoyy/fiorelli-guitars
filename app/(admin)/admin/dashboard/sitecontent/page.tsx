import Title from "@/app/(admin)/components/Title";
import { getPageContent } from "@/app/utilities/databaseFunctions";
import { getContentBlocks } from "@/app/utilities/helpers";
import SelectEditablePageLayout from "./SelectEditablePageLayout";

const SiteContent = async () => {
	const homeContent = await getPageContent("Home");
	const aboutContent = await getPageContent("About");
	const contactContent = await getPageContent("Contact");

	const homeContentBlocks = getContentBlocks(homeContent.versions[0]);
	const aboutContentBlocks = getContentBlocks(aboutContent.versions[0]);
	const contactContentBlocks = getContentBlocks(contactContent.versions[0]);

	const pageContentBlocks = [homeContentBlocks, aboutContentBlocks, contactContentBlocks];

	const titlesArray = [homeContent.title, aboutContent.title, contactContent.title];

	return (
		<>
			<Title title="Site Content" />
			<SelectEditablePageLayout
				pageContentBlocks={pageContentBlocks}
				titlesArray={titlesArray}
			/>
		</>
	);
};

export default SiteContent;
