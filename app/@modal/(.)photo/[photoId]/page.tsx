import AnimateWrapper from "@/app/components/components/AnimateWrapper";
import { Modal } from "./modal";

interface PhotoModalProps {
	params: {
		photoId: string;
	};
}

const PhotoModal: React.FC<PhotoModalProps> = ({ params: { photoId } }) => {
	return <Modal>{photoId}</Modal>;
};

export default PhotoModal;
