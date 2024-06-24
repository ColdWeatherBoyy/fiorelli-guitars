import { cloudinary } from "@/app/utilities/cloudinary";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import { CloudinaryResource } from "@/app/utilities/types";
import { FC } from "react";
import GallerySlider from "./GallerySlider";

interface GallerySliderWrapperProps {
	tag: string;
	title: string;
}

const GallerySliderWrapper: FC<GallerySliderWrapperProps> = async ({ tag, title }) => {
	const { resources } = await cloudinary.search
		.expression(`tags=${tag}`)
		.sort_by(`public_id`, `desc`)
		.execute();

	const fullResources = await Promise.all(
		resources.map(async (resource: CloudinaryResource) => {
			const thumbnailUrl = resource.secure_url.replace(
				"upload/",
				"upload/c_thumb,h_250,w_250/"
			);
			const thumbnailBlurDataUrl = await getBlurDataUrl(thumbnailUrl);
			resource = {
				...resource,
				blurDataUrl: thumbnailBlurDataUrl,
				secure_url: thumbnailUrl,
			};

			return resource;
		})
	);

	return <GallerySlider title={title} resources={fullResources} />;
};

export default GallerySliderWrapper;
