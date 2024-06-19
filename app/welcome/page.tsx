import { cloudinary } from "../utilities/cloudinary";
import WelcomeDisplay from "./components/WelcomeDisplay";

export default async function Home() {
	const { resources } = await cloudinary.search
		.expression(`tags=welcome`)
		.sort_by(`public_id`, `desc`)
		.max_results(30)
		.execute();
	const welcomeImage = resources[0];

	return <WelcomeDisplay welcomeImage={welcomeImage} />;
}
