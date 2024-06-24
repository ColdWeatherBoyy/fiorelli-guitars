import { cloudinary } from "@/app/utilities/cloudinary";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import { CloudinaryResource } from "@/app/utilities/types";
import { FC } from "react";
import BackgroundImageCarousel from "./BackgroundImageCarousel";

export const BackgroundImageWrapper: FC = async () => {
	const { total_count, time, resources } = await cloudinary.search
		.expression(`tags=background`)
		.sort_by(`public_id`, `desc`)
		.max_results(30)
		.execute();
	const fullResources: CloudinaryResource[] = [...resources];
	for (let i = 0; i < resources.length; i++) {
		const resource = resources[i];
		const blurDataUrl = await getBlurDataUrl(resource.public_id);
		fullResources[i] = {
			...resource,
			blurDataUrl,
		};
	}
	return <BackgroundImageCarousel resources={fullResources} />;
};

export default BackgroundImageWrapper;
