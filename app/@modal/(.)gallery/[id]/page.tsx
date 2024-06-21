import PhotoCard from "@/app/components/components/PhotoCard";
import { cloudinary } from "@/app/utilities/cloudinary";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";
import { CloudinaryResource, GalleryPhotoProps } from "@/app/utilities/types";
import ModalWrapper from "./ModalWrapper";

export async function generateStaticParams() {
	const { resources } = await cloudinary.search.expression(`tags=gallery`).execute();
	return resources.map((resource: CloudinaryResource) => ({
		id: resource.public_id,
	}));
}

const PhotoModal: React.FC<GalleryPhotoProps> = async ({ params: { id } }) => {
	const { time, resources } = await cloudinary.search
		.expression(`public_id=${id}`)
		.execute();

	const dataUrl = await getBlurDataUrl(resources[0].public_id);
	const photoResource = {
		...resources[0],
		dataUrl,
	};

	return (
		<ModalWrapper>
			<PhotoCard photoResource={photoResource} />
		</ModalWrapper>
	);
};

export default PhotoModal;
