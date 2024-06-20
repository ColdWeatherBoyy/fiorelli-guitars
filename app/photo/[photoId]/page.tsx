import { cloudinary } from "@/app/utilities/cloudinary";
import PhotoCard from "../../components/components/PhotoCard";
import AnimateWrapper from "@/app/components/components/AnimateWrapper";

const Photo: React.FC = async () => {
	const { resources } = await cloudinary.search
		.expression(`public_id=fiorelli/Vert_Detail_1`)
		.execute();
	console.log(resources[0]);
	return (
		<AnimateWrapper>
			<PhotoCard photoResource={resources[0]} />
		</AnimateWrapper>
	);
};

export default Photo;
