import { cloudinary } from "@/app/utilities/cloudinary";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import Link from "next/link";
import AnimateWrapper from "../../components/AnimateWrapper";
import Card from "../components/components/Card";
import PhotoCard from "../components/components/PhotoCard";
import ContactForm from "./components/ContactForm";

export default async function Contact() {
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
			<Card title={"Contact Fiorelli"}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 items-center">
					<PhotoCard {...contactImage}>
						<div className="text-center">
							For all orders, questions, and other inquiries, please reach out here, or
							you can email me at{" "}
							<Link href="mailto:jamie@fiorelliguitars.com" className="underline">
								jamie@fiorelliguitars.com
							</Link>
						</div>
					</PhotoCard>
					<ContactForm />
				</div>
			</Card>
		</AnimateWrapper>
	);
}
