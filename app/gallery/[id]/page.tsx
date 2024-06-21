import { cloudinary } from "@/app/utilities/cloudinary";
import PhotoCard from "../../components/components/PhotoCard";
import AnimateWrapper from "@/app/components/components/AnimateWrapper";
import { CloudinaryResource, GalleryPhotoProps } from "@/app/utilities/types";
import { getCldImageUrl } from "next-cloudinary";

export async function generateStaticParams() {
	const { resources } = await cloudinary.search.expression(`tags=gallery`).execute();
	return resources.map((resource: CloudinaryResource) => ({
		id: resource.public_id,
	}));
}

const Photo: React.FC<GalleryPhotoProps> = async ({ params: { id } }) => {
	const { resources } = await cloudinary.search.expression(`public_id=${id}`).execute();
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
			<PhotoCard photoResource={photoResource} />
		</AnimateWrapper>
	);
};

export default Photo;
