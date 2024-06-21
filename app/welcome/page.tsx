import { cloudinary } from "../utilities/cloudinary";
import { getBlurDataUrl } from "../utilities/imageHelpers";
import WelcomeDisplay from "./components/WelcomeDisplay";

export default async function Home() {
	const { resources } = await cloudinary.search.expression(`tags=welcome`).execute();

	const blurDataUrl = await getBlurDataUrl(resources[0].public_id);
	const welcomeImage = {
		...resources[0],
		blurDataUrl,
	};

	return <WelcomeDisplay welcomeImage={welcomeImage} />;
}
