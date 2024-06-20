import { cloudinary } from "@/app/utilities/cloudinary";
import PhotoCard from "./PhotoCard";

const Photo: React.FC = async () => {
	const { resources } = await cloudinary.search
		.expression(`public_id=fiorelli/Vert_Detail_1`)
		.execute();
	console.log(resources[0]);
	return <PhotoCard photoResource={resources[0]} />;
};

export default Photo;
