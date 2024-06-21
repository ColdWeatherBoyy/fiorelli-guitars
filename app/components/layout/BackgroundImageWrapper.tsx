import { FC } from "react";
import BackgroundImageCarousel from "./BackgroundImageCarousel";
import { cloudinary } from "@/app/utilities/cloudinary";
import { getCldImageUrl } from "next-cloudinary";
import { CloudinaryResource } from "@/app/utilities/types";
import { getBlurDataUrl } from "@/app/utilities/helpers";

export const BackgroundImageWrapper: FC = async () => {
	const { total_count, time, resources } = await cloudinary.search
		.expression(`tags=background`)
		.sort_by(`public_id`, `desc`)
		.max_results(30)
		.execute();
	const fullResources: CloudinaryResource[] = [...resources];
	for (let i = 0; i < resources.length; i++) {
		const resource = resources[i];
		const dataUrl = await getBlurDataUrl(resource.public_id);
		fullResources[i] = {
			...resource,
			dataUrl,
		};
	}
	return <BackgroundImageCarousel resources={fullResources} />;
};

export default BackgroundImageWrapper;
