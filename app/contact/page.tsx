import AnimateWrapper from "../components/components/AnimateWrapper";
import Card from "../components/components/Card";
import ContactForm from "./components/ContactForm";
import { cloudinary } from "../utilities/cloudinary";
import { getBlurDataUrl } from "../utilities/imageHelpers";
import WelcomeImage from "../welcome/components/WelcomeImage";
import GalleryImage from "../gallery/components/GalleryImage";

export default async function Contact() {
	const { resources } = await cloudinary.search
		.expression(`tags=contact_form`)
		.with_field("context")
		.execute();

	const blurDataUrl = await getBlurDataUrl(resources[0].public_id);
	const welcomeImage = {
		...resources[0],
		blurDataUrl,
	};
	return (
		<AnimateWrapper>
			<Card title={"Contact Fiorelli"}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 items-center">
					<GalleryImage {...welcomeImage} />
					<ContactForm />
				</div>
			</Card>
		</AnimateWrapper>
	);
}
