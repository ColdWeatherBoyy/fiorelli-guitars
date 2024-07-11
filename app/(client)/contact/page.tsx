import { cloudinary } from "@/app/utilities/cloudinary";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import Link from "next/link";
import AnimateWrapper from "../../components/AnimateWrapper";
import Card from "../components/components/Card";
import PhotoCard from "../components/components/PhotoCard";
import ContactForm from "./components/ContactForm";
import { getPageContent } from "@/app/utilities/databaseFunctions";

export default async function Contact() {
	const contactPageData = await getPageContent("Contact");
	if (!contactPageData.content) throw new Error("Error retrieving site content.");

	const { resources } = await cloudinary.search
		.expression(`tags=contact_form`)
		.with_field("context")
		.execute();

	const blurDataUrl = await getBlurDataUrl(resources[0].public_id);
	const contactImage = {
		...resources[0],
		blurDataUrl,
	};
	return (
		<AnimateWrapper>
			<Card title={contactPageData.content.heading}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 items-center">
					<PhotoCard {...contactImage}>
						<div className="text-center">
							{contactPageData.content.bodies[0]}
							<Link
								href={`mailto:${contactPageData.content.email}`}
								className="underline"
							>
								{contactPageData.content.email}
							</Link>
						</div>
					</PhotoCard>
					<ContactForm />
				</div>
			</Card>
		</AnimateWrapper>
	);
}
