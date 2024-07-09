import { getPageContent } from "@/app/utilities/databaseFunctions";

const SiteContent = async () => {
	const homePageContent = await getPageContent("HomePage");
	const aboutContent = await getPageContent("About");
	const contactContent = await getPageContent("Contact");
	console.log("1", homePageContent);
	console.log("2", aboutContent);
	console.log("3", contactContent);
	return (
		<div>
			<h1>Site Content</h1>
		</div>
	);
};

export default SiteContent;
