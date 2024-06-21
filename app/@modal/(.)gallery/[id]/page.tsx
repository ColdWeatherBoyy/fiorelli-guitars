import PhotoCard from "@/app/components/components/PhotoCard";
import { cloudinary } from "@/app/utilities/cloudinary";
import { Modal } from "./modal";

interface PhotoModalProps {
	params: {
		id: string;
	};
}

const PhotoModal: React.FC<PhotoModalProps> = async ({ params: { id } }) => {
	const { resources } = await cloudinary.search
		.expression(`public_id=fiorelli/Vert_Detail_1`)
		.execute();
	return (
		<Modal>
			<PhotoCard photoResource={resources[0]} isModal />
		</Modal>
	);
};

export default PhotoModal;
