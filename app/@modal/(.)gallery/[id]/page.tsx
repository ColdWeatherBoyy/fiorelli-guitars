import PhotoCard from "@/app/components/components/PhotoCard";
import { cloudinary } from "@/app/utilities/cloudinary";
import { CloudinaryResource, GalleryPhotoProps } from "@/app/utilities/types";
import ModalWrapper from "./ModalWrapper";

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
	return (
		<ModalWrapper>
			<PhotoCard photoResource={resources[0]} isModal />
		</ModalWrapper>
	);
};

export default PhotoModal;
