import { cloudinary } from "@/app/utilities/cloudinary";
import PhotoCard from "../../components/components/PhotoCard";
import AnimateWrapper from "@/app/components/components/AnimateWrapper";
import { CloudinaryResource, GalleryPhotoProps } from "@/app/utilities/types";

export async function generateStaticParams() {
	const { resources } = await cloudinary.search.expression(`tags=gallery`).execute();
	return resources.map((resource: CloudinaryResource) => ({
		id: resource.public_id,
	}));
}

const Photo: React.FC<GalleryPhotoProps> = async ({ params: { id } }) => {
	const { resources } = await cloudinary.search.expression(`public_id=${id}`).execute();
	return (
		<AnimateWrapper>
			<PhotoCard photoResource={resources[0]} />
		</AnimateWrapper>
	);
};

export default Photo;
