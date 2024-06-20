import AnimateWrapper from "@/app/components/components/AnimateWrapper";
import Card from "@/app/components/components/Card";

interface PhotoModalProps {
	params: {
		photoId: string;
	};
}

const PhotoModal: React.FC<PhotoModalProps> = ({ params: { photoId } }) => {
	return (
		<AnimateWrapper>
			<Card>hi main page:{photoId}</Card>
		</AnimateWrapper>
	);
};

export default PhotoModal;
