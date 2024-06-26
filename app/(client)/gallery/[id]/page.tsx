import { cloudinary } from "@/app/utilities/cloudinary";
import { CloudinaryResource, GalleryPhotoProps, TextSize } from "@/app/utilities/types";
import { getCldImageUrl } from "next-cloudinary";
import AnimateWrapper from "../../components/components/AnimateWrapper";
import CardButtonLink from "../../components/components/CardButtonLink";
import PhotoCard from "../../components/components/PhotoCard";
import Card from "../../components/components/Card";

export async function generateStaticParams() {
	const { resources } = await cloudinary.search
		.expression(`tags=gallery`)
		.with_field("context")
		.execute();
	return resources.map((resource: CloudinaryResource) => ({
		id: resource.public_id,
	}));
}

const Photo: React.FC<GalleryPhotoProps> = async ({ params: { id } }) => {
	const { resources } = await cloudinary.search
		.expression(`public_id=${id}`)
		.with_field("context")
		.execute();
	const response = await fetch(
		getCldImageUrl({
			src: resources[0].public_id,
			width: 100,
		})
	);
	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const base64 = buffer.toString("base64");
	const blurDataUrl = `data:${response.type};base64,${base64}`;
	const photoResource = { ...resources[0], blurDataUrl };

	return (
		<AnimateWrapper>
			<PhotoCard {...photoResource}>
				<CardButtonLink href="/gallery" text="Back to Gallery" size={TextSize.small} />
			</PhotoCard>
		</AnimateWrapper>
	);
};

export default Photo;
