import { cloudinary } from "@/app/utilities/cloudinary";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import { CloudinaryResource, GalleryPhotoProps, TextSize } from "@/app/utilities/types";
import AnimateWrapper from "../../../../components/AnimateWrapper";
import CardButtonLink from "../../../components/components/CardButtonLink";
import PhotoCard from "../../../components/components/PhotoCard";

export async function generateStaticParams() {
	// To-DO: GET TAGS FROM DB
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
				<PhotoCard
					{...photoResource}
					length={resources.length}
					index={parseInt(index)}
					maxHeight="max-h-[65dvh]"
				>
					<CardButtonLink href="/gallery" text="Back to Gallery" size={TextSize.small} />
				</PhotoCard>
			</div>
		</AnimateWrapper>
	);
};

export default Photo;
