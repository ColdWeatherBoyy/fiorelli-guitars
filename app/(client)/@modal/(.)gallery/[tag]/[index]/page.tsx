import CardButtonLink from "@/app/(client)/components/components/CardButtonLink";
import PhotoCard from "@/app/(client)/components/components/PhotoCard";
import { cloudinary } from "@/app/utilities/cloudinary";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import { CloudinaryResource, GalleryPhotoProps, TextSize } from "@/app/utilities/types";
import ModalWrapper from "./ModalWrapper";

export async function generateStaticParams() {
	const { resources } = await cloudinary.search
		.expression(`tags=gallery`)
		.with_field("context")
		.execute();

	return resources.map((resource: CloudinaryResource) => ({
		id: resource.public_id,
	}));
}

const PhotoModal: React.FC<GalleryPhotoProps> = async ({ params: { tag, index } }) => {
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
		<ModalWrapper>
			<PhotoCard {...photoResource}>
				<CardButtonLink href="/gallery" text="Back to Gallery" size={TextSize.small} />
			</PhotoCard>
		</ModalWrapper>
	);
};

export default PhotoModal;
