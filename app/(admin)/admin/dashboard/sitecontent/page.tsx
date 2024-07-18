import SelectEditableLayout from "@/app/(admin)/components/CMS/SelectableEditableLayout";
import Title from "@/app/(admin)/components/Title";
import { getPageContent } from "@/app/utilities/databaseFunctions";
import { useDeviceType } from "@/app/utilities/hooks.server";
import { PageContent } from "@prisma/client";

const SiteContent = async () => {
	const isMobile = useDeviceType();
	const homePageData = await getPageContent("Home");
	const aboutPageData = await getPageContent("About");
	const contactPageData = await getPageContent("Contact");
	if (!homePageData.content || !aboutPageData.content || !contactPageData.content)
		return null;

	const pageContentData: PageContent[] = [
		homePageData.content,
		aboutPageData.content,
		contactPageData.content,
	];

	const titlesArray = [homePageData.title, aboutPageData.title, contactPageData.title];

	return (
		<>
			<Title title="Site Content" />
			<SelectEditableLayout
				content={pageContentData}
				titlesArray={titlesArray}
				isMobile={isMobile}
			/>
		</>
	);
};

export default SiteContent;
