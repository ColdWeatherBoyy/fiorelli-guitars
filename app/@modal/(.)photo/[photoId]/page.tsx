import AnimateWrapper from "@/app/components/components/AnimateWrapper";
import { Modal } from "./modal";
import PhotoCard from "@/app/components/components/PhotoCard";
import { cloudinary } from "@/app/utilities/cloudinary";

interface PhotoModalProps {
	params: {
		photoId: string;
	};
}

const PhotoModal: React.FC<PhotoModalProps> = async ({ params: { photoId } }) => {
	const { resources } = await cloudinary.search
		.expression(`public_id=fiorelli/Vert_Detail_1`)
		.execute();
	console.log(resources[0]);
	return (
		<Modal>
			<PhotoCard photoResource={resources[0]} isModal />
		</Modal>
	);
};

export default PhotoModal;
