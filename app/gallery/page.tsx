import { CldImage } from "next-cloudinary";
import { cloudinary } from "../utilities/cloudinary";
import GallerySlider from "./components/GallerySlider";

export interface CloudinaryResource {
	public_id: string;
	secure_url: string;
}

const Gallery = async () => {
	const { total_count, time, resources } = await cloudinary.search
		.expression(`folder:fiorelli/backgroundImages/*`)
		.sort_by(`public_id`, `desc`)
		.max_results(30)
		.execute();
	return (
		<div>
			<h1>Gallery</h1>
			<GallerySlider resources={resources} />
		</div>
	);
};
export default Gallery;
