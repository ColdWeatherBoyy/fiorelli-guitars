import { cloudinary } from "@/app/utilities/cloudinary";
import { getAllGalleryVariantGuitarModels } from "@/app/utilities/databaseFunctions/variantguitar.db";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import { CloudinaryResource, GalleryPhotoProps } from "@/app/utilities/types";
import AnimateWrapper from "../../../../components/AnimateWrapper";
import CardButtonLink from "../../../components/components/CardButtonLink";
import PhotoCard from "../../../components/components/PhotoCard";
import { getResources } from "@/app/utilities/cloudinaryFunctions/cloudinary.get";

export async function generateStaticParams() {
	const resources = await getAllGalleryVariantGuitarModels();
	if (resources instanceof Error) {
		throw resources;
	}
	const tags = resources.guitarModelsWithSpecs.map((guitar) => guitar.variantTag);

	const allParams: { tag: string; index: string }[] = [];

	for (const tag of tags) {
		const cloudinaryResources = await getResources(tag);

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

const Photo: React.FC<GalleryPhotoProps> = async ({ params: { tag, index } }) => {
	const resources = await getResources(tag);

	const resource = resources[Number(index)];

	return (
		<AnimateWrapper>
			<div className="-mt-10 -mb-24">
				<PhotoCard
					{...resource}
					length={resources.length}
					index={parseInt(index)}
					maxHeight="max-h-[65dvh]"
				>
					<CardButtonLink href="/gallery" text="Back to Gallery" />
				</PhotoCard>
			</div>
		</AnimateWrapper>
	);
};

export default Photo;
