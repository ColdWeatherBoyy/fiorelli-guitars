import AnimateWrapper from "../components/AnimateWrapper";
import { getPageContent } from "../utilities/databaseFunctions";
import Card from "./components/components/Card";

export default async function Home() {
	const homePageData = await getPageContent("Home");
	if (!homePageData.content) throw new Error("Error retrieving site content.");

	return (
		<AnimateWrapper>
			<Card title={homePageData.content.heading} body={homePageData.content.bodies} />
		</AnimateWrapper>
	);
}
