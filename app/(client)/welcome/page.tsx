import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import WelcomeDisplay from "./components/WelcomeDisplay";
import { cloudinary } from "@/app/utilities/cloudinary";

export default async function Home() {
	const { resources } = await cloudinary.search
		.expression(`tags=welcome`)
		.with_field("context")
		.execute();

	const blurDataUrl = await getBlurDataUrl(resources[0].public_id);
	const welcomeImage = {
		...resources[0],
		blurDataUrl,
	};

	return <WelcomeDisplay welcomeImage={welcomeImage} />;
}
