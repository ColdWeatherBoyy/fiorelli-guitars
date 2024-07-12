import { cloudinary } from "@/app/utilities/cloudinary";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import { CloudinaryResource, GalleryPhotoProps, TextSize } from "@/app/utilities/types";
import AnimateWrapper from "../../../../components/AnimateWrapper";
import CardButtonLink from "../../../components/components/CardButtonLink";
import PhotoCard from "../../../components/components/PhotoCard";

export async function generateStaticParams() {
	const { resources } = await cloudinary.search
		.expression(`tags=gallery`)
		.with_field("context")
		.execute();
	return resources.map((resource: CloudinaryResource) => ({
		id: resource.public_id,
	}));
}

const Photo: React.FC<GalleryPhotoProps> = async ({ params: { tag, index } }) => {
	const { resources } = await cloudinary.search
		.expression(`tags=${tag}`)
		.with_field("context")
		.execute();
	const resource = resources[index];
	const blurDataUrl = await getBlurDataUrl(resource.public_id);
	const photoResource = {
		...resource,
		blurDataUrl,
	};

	return (
		<AnimateWrapper>
			<div className="-mt-10 -mb-24">
				<PhotoCard {...photoResource} maxHeight="max-h-[65dvh]">
					<CardButtonLink href="/gallery" text="Back to Gallery" size={TextSize.small} />
				</PhotoCard>
			</div>
		</AnimateWrapper>
	);
};

export default Photo;
