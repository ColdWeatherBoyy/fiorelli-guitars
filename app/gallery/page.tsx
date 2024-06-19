import { cloudinary } from "../utilities/cloudinary";
import GallerySlider from "./components/GallerySlider";

const Gallery = async () => {
	const { total_count, time, resources } = await cloudinary.search
		.expression(`folder:fiorelli/backgroundImages/*`)
		.sort_by(`public_id`, `desc`)
		.max_results(30)
		.execute();
	return (
		<div>
			<GallerySlider resources={resources} />
		</div>
	);
};
export default Gallery;
