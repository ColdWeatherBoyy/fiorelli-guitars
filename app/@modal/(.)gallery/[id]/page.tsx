import PhotoCard from "@/app/components/components/PhotoCard";
import { cloudinary } from "@/app/utilities/cloudinary";
import { CloudinaryResource, GalleryPhotoProps } from "@/app/utilities/types";
import ModalWrapper from "./ModalWrapper";
import { getCldImageUrl } from "next-cloudinary";

export async function generateStaticParams() {
	console.log("hi");
	const { resources } = await cloudinary.search.expression(`tags=gallery`).execute();
	return resources.map((resource: CloudinaryResource) => ({
		id: resource.public_id,
	}));
}

const PhotoModal: React.FC<GalleryPhotoProps> = async ({ params: { id } }) => {
	const { time, resources } = await cloudinary.search
		.expression(`public_id=${id}`)
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
	const dataUrl = `data:${response.type};base64,${base64}`;
	const photoResource = { ...resources[0], blurDataUrl: dataUrl };

	return (
		<ModalWrapper>
			<PhotoCard photoResource={photoResource} />
		</ModalWrapper>
	);
};

export default PhotoModal;
