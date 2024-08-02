import CardButtonLink from "@/app/(client)/components/components/CardButtonLink";
import PhotoCard from "@/app/(client)/components/components/PhotoCard";
import { cloudinary } from "@/app/utilities/cloudinary";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import { CloudinaryResource, GalleryPhotoProps, TextSize } from "@/app/utilities/types";
import ModalWrapper from "../../../../components/ModalWrapper";

// TODO: Better way to get necessary tags to use here
export async function generateStaticParams() {
	// Get from database all galleryguitars, map their variantTags, and then use them to search cloudinary
	const { resources: resourcesEJ } = await cloudinary.search
		.expression(`tags=Slipstream_BlueCream`)
		.with_field("context")
		.execute();
	const { resources: resourcesSP } = await cloudinary.search
		.expression(`tags=SPGuitar_Natural`)
		.with_field("context")
		.execute();

	const params = resourcesEJ.map((resource: CloudinaryResource, index: number) => ({
		tag: "Slipstream_BlueCream",
		index: index.toString(),
	}));
	const params2 = resourcesSP.map((resource: CloudinaryResource, index: number) => ({
		tag: "SPGuitar_Natural",
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
