import { cloudinary } from "@/app/utilities/cloudinary";
import { getBlurDataUrl } from "@/app/utilities/helpers";
import { FC } from "react";
import GallerySlider from "./GallerySlider";
import { CloudinaryResource } from "@/app/utilities/types";

interface GallerySliderWrapperProps {
	tag: string;
	title: string;
}

const GallerySliderWrapper: FC<GallerySliderWrapperProps> = async ({ tag, title }) => {
	const { resources } = await cloudinary.search
		.expression(`tags=${tag}`)
		.sort_by(`public_id`, `desc`)
		.max_results(30)
		.execute();

	const fullResources: CloudinaryResource[] = [];
	for (let i = 0; i < resources.length; i++) {
		const resource = resources[i];
		const dataUrl = await getBlurDataUrl(resource.public_id);
		fullResources[i] = {
			...resource,
			dataUrl,
		};
	}
	return <GallerySlider title={title} resources={fullResources} />;
};

export default GallerySliderWrapper;
