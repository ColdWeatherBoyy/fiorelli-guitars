import PhotoCard from "@/app/components/components/PhotoCard";
import { cloudinary } from "@/app/utilities/cloudinary";
import { Modal } from "./modal";
import { GalleryPhotoProps } from "@/app/utilities/types";
import { Suspense } from "react";

const PhotoModal: React.FC<GalleryPhotoProps> = async ({ params: { id } }) => {
	const { time, resources } = await cloudinary.search
		.expression(`public_id=${decodeURIComponent(id)}`)
		.execute();
	return (
		<Modal>
			<PhotoCard photoResource={resources[0]} isModal />
		</Modal>
	);
};

export default PhotoModal;
