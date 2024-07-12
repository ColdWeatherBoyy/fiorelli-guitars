import CardButtonLink from "@/app/(client)/components/components/CardButtonLink";
import PhotoCard from "@/app/(client)/components/components/PhotoCard";
import { cloudinary } from "@/app/utilities/cloudinary";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import { CloudinaryResource, GalleryPhotoProps, TextSize } from "@/app/utilities/types";
import ModalWrapper from "./ModalWrapper";

export async function generateStaticParams() {
	const { resources: resourcesEJ } = await cloudinary.search
		.expression(`tags=EJ_Guitar`)
		.with_field("context")
		.execute();
	const { resources: resourcesSP } = await cloudinary.search
		.expression(`tags=SP_Guitar`)
		.with_field("context")
		.execute();

	const params = resourcesEJ.map((resource: CloudinaryResource, index: number) => ({
		tag: "EJ_Guitar",
		index: index.toString(),
	}));
	const params2 = resourcesSP.map((resource: CloudinaryResource, index: number) => ({
		tag: "SP_Guitar",
		index: index.toString(),
	}));
	return params.concat(params2);
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
			<PhotoCard {...photoResource} length={resources.length} index={parseInt(index)}>
				<CardButtonLink href="/gallery" text="Back to Gallery" size={TextSize.small} />
			</PhotoCard>
		</ModalWrapper>
	);
};

export default PhotoModal;
