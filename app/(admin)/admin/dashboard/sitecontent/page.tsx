import Title from "@/app/(admin)/components/Title";
import { getPageContent } from "@/app/utilities/databaseFunctions";
import { getContentBlocks } from "@/app/utilities/helpers";
import SelectEditablePageLayout from "./SelectEditablePageLayout";
import { useDeviceType } from "@/app/utilities/hooks.server";

const SiteContent = async () => {
	const isMobile = useDeviceType();
	const homePageData = await getPageContent("Home");
	const aboutPageData = await getPageContent("About");
	const contactPageData = await getPageContent("Contact");

	const homeContentData = getContentBlocks(homePageData.content);
	const aboutContentData = getContentBlocks(aboutPageData.content);
	const contactContentData = getContentBlocks(contactPageData.content);
	if (!homeContentData || !aboutContentData || !contactContentData) return null;

	const pageContentData = [homeContentData, aboutContentData, contactContentData];

	const titlesArray = [homePageData.title, aboutPageData.title, contactPageData.title];

	return (
		<>
			<Title title="Site Content" />
			<SelectEditablePageLayout
				pageContentData={pageContentData}
				titlesArray={titlesArray}
				isMobile={isMobile}
			/>
		</>
	);
};

export default SiteContent;
