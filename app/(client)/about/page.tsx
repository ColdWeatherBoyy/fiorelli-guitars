import AnimateWrapper from "../../components/AnimateWrapper";
import Card from "../components/components/Card";
import { cloudinary } from "../../utilities/cloudinary";
import { getBlurDataUrl } from "../../utilities/imageHelpers";
import { CloudinaryResource } from "../../utilities/types";
import { getPageContent } from "@/app/utilities/databaseFunctions";

export default async function About() {
	const { pageContent } = await getPageContent("About");
	if (!pageContent) throw new Error("Error retrieving site content.");

	const { time, resources } = await cloudinary.search
		.expression(`tags=about`)
		.with_field("context")
		.execute();

	const fullResources: CloudinaryResource[] = [];
	for (const resource of resources) {
		resource.secure_url = resource.secure_url.replace(
			"upload/",
			"upload/c_auto,w_225,h_225/"
		);
		const blurDataUrl = await getBlurDataUrl(resource.public_id);
		fullResources.push({ ...resource, blurDataUrl });
	}

	return (
		<AnimateWrapper>
			<Card title={pageContent.heading} body={pageContent.bodies} images={fullResources}>
				<div className="text-xl">{pageContent.signature}</div>
			</Card>
		</AnimateWrapper>
	);
}
