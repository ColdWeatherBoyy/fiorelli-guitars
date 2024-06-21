import PhotoCard from "@/app/components/components/PhotoCard";
import { cloudinary } from "@/app/utilities/cloudinary";
import { Modal } from "./modal";
import { GalleryPhotoProps } from "@/app/utilities/types";

const PhotoModal: React.FC<GalleryPhotoProps> = async ({ params: { id } }) => {
	const { resources } = await cloudinary.search
		.expression(`public_id=${decodeURIComponent(id)}`)
		.execute();
	console.log(resources);
	return (
		<Modal>
			<PhotoCard photoResource={resources[0]} isModal />
		</Modal>
	);
};

export default PhotoModal;
