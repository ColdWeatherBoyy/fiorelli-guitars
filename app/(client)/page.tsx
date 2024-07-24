import AnimateWrapper from "../components/AnimateWrapper";
import { getPageContent } from "../utilities/databaseFunctions/pagecontent.db";
import Card from "./components/components/Card";

export default async function Home() {
	const data = await getPageContent("Home");
	if (data instanceof Error) {
		throw data;
	}
	return (
		<AnimateWrapper>
			<Card title={data.pageContent.heading} body={data.pageContent.bodies} />
		</AnimateWrapper>
	);
}
