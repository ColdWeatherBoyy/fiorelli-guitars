import { getResources } from "@/app/utilities/cloudinaryFunctions/cloudinary.get";
import { getPageContent } from "@/app/utilities/databaseFunctions/pagecontent.db";
import AnimateWrapper from "../../components/AnimateWrapper";
import Card from "../components/components/Card";

export default async function About() {
	const data = await getPageContent("About");
	if (data instanceof Error) {
		throw data;
	}

	const fullResources = await getResources("about");

	return (
		<AnimateWrapper>
			<Card
				title={data.pageContent.heading}
				body={data.pageContent.bodies}
				images={fullResources}
			>
				<div className="text-xl">{data.pageContent.signature}</div>
			</Card>
		</AnimateWrapper>
	);
}
