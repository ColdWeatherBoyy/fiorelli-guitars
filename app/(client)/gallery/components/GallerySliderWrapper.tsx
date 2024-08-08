import { cloudinary } from "@/app/utilities/cloudinary";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import { CloudinaryResource } from "@/app/utilities/types";
import { FC } from "react";
import GallerySlider from "./GallerySlider";
import { useDeviceType } from "@/app/utilities/hooks.server";
import { getResources } from "@/app/utilities/cloudinaryFunctions/cloudinary.get";

interface GallerySliderWrapperProps {
	tag: string;
	title: string;
}

const GallerySliderWrapper: FC<GallerySliderWrapperProps> = async ({ tag, title }) => {
	const isMobile = useDeviceType();
	const fullResources = await getResources(tag);

	return (
		<GallerySlider
			title={title}
			resources={fullResources}
			tag={tag}
			isMobile={isMobile}
		/>
	);
};

export default GallerySliderWrapper;
