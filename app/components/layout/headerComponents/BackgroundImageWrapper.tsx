import { FC } from "react";
import BackgroundImageCarousel from "../BackgroundImageCarousel";
import { cloudinary } from "@/app/utilities/cloudinary";

export const BackgroundImageWrapper: FC = async () => {
	const { total_count, time, resources } = await cloudinary.search
		.expression(`tags=background`)
		.sort_by(`public_id`, `desc`)
		.max_results(30)
		.execute();
	return (
		<div className="absolute left-0 top-0 h-screen w-screen overflow-hidden -z-20">
			<BackgroundImageCarousel resources={resources} />
		</div>
	);
};

export default BackgroundImageWrapper;
