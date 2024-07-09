import Title from "@/app/(admin)/components/Title";
import { getPageContent } from "@/app/utilities/databaseFunctions";
import { getContentBlocks } from "@/app/utilities/helpers";
import SelectEditablePageLayout from "./SelectEditablePageLayout";
import { useDeviceType } from "@/app/utilities/hooks.server";

const SiteContent = async () => {
	const isMobile = useDeviceType();
	const homeContent = await getPageContent("Home");
	const aboutContent = await getPageContent("About");
	const contactContent = await getPageContent("Contact");

	const homeContentBlocks = getContentBlocks(homeContent.content);
	const aboutContentBlocks = getContentBlocks(aboutContent.content);
	const contactContentBlocks = getContentBlocks(contactContent.content);

	const pageContentBlocks = [homeContentBlocks, aboutContentBlocks, contactContentBlocks];

	const titlesArray = [homeContent.title, aboutContent.title, contactContent.title];

	return (
		<>
			<Title title="Site Content" />
			<SelectEditablePageLayout
				pageContentBlocks={pageContentBlocks}
				titlesArray={titlesArray}
				isMobile={isMobile}
			/>
		</>
	);
};

export default SiteContent;
