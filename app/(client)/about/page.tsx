import { getResources } from "@/app/utilities/cloudinaryFunctions/cloudinary.get";
import { getPageContent } from "@/app/utilities/databaseFunctions/pagecontent.db";
import AnimateWrapper from "../../components/AnimateWrapper";
import Card from "../components/components/Card";
import { sortResourcesByPriority } from "@/app/utilities/helpers";

export default async function About() {
	const data = await getPageContent("About");
	if (data instanceof Error) {
		throw data;
	}

	const fullResources = await getResources("about");

	const priorityTags = ["about_0", "about_1", "about_2", "about_3"];
	sortResourcesByPriority(priorityTags, fullResources);

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
