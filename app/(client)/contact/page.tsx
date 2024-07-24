import { cloudinary } from "@/app/utilities/cloudinary";
import { getPageContent } from "@/app/utilities/databaseFunctions/pagecontent.db";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import Link from "next/link";
import AnimateWrapper from "../../components/AnimateWrapper";
import Card from "../components/components/Card";
import PhotoCard from "../components/components/PhotoCard";
import ContactForm from "./components/ContactForm";

export default async function Contact() {
	const data = await getPageContent("Contact");
	if (data instanceof Error) {
		throw data;
	}
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
			<Card title={data.pageContent.heading}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 items-center w-fit h-fit">
					<PhotoCard {...contactImage}>
						<div className="text-center">
							{data.pageContent.bodies[0]}
							<Link href={`mailto:${data.pageContent.email}`} className="underline">
								{data.pageContent.email}
							</Link>
						</div>
					</PhotoCard>
					<ContactForm />
				</div>
			</Card>
		</AnimateWrapper>
	);
}
