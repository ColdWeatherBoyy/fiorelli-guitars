import CardButtonLink from "@/app/(client)/components/components/CardButtonLink";
import PhotoCard from "@/app/(client)/components/components/PhotoCard";
import { cloudinary } from "@/app/utilities/cloudinary";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import { CloudinaryResource, GalleryPhotoProps, TextSize } from "@/app/utilities/types";
import ModalWrapper from "../../../../components/ModalWrapper";
import { getAllGalleryVariantGuitarModels } from "@/app/utilities/databaseFunctions/variantguitar.db";

export async function generateStaticParams() {
	const resources = await getAllGalleryVariantGuitarModels();
	if (resources instanceof Error) {
		throw resources;
	}
	const tags = resources.guitarModelsWithSpecs.map((guitar) => guitar.variantTag);

	const fetchResourcesByTag = async (tag: string) => {
		return cloudinary.search.expression(`tags=${tag}`).with_field("context").execute();
	};
	const allParams: { tag: string; index: string }[] = [];

	for (const tag of tags) {
		const { resources: cloudinaryResources } = await fetchResourcesByTag(tag);

		const params = cloudinaryResources.map(
			(resource: CloudinaryResource, index: number) => ({
				tag: tag,
				index: index.toString(),
			})
		);

		allParams.push(...params);
	}
	return allParams;
}

const PhotoModal: React.FC<GalleryPhotoProps> = async ({ params: { tag, index } }) => {
	const { resources } = await cloudinary.search
		.expression(`tags=${tag}`)
		.with_field("context")
		.sort_by(`public_id`, `desc`)
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
