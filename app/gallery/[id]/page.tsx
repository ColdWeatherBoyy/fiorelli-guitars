import { cloudinary } from "@/app/utilities/cloudinary";
import PhotoCard from "../../components/components/PhotoCard";
import AnimateWrapper from "@/app/components/components/AnimateWrapper";
import { GalleryPhotoProps } from "@/app/utilities/types";

const Photo: React.FC<GalleryPhotoProps> = async ({ params: { id } }) => {
	const { resources } = await cloudinary.search
		.expression(`public_id=${decodeURIComponent(id)}`)
		.execute();
	return (
		<AnimateWrapper>
			<PhotoCard photoResource={resources[0]} />
		</AnimateWrapper>
	);
};

export default Photo;
