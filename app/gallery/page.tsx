import { cloudinary } from "../utilities/cloudinary";

const Gallery = async () => {
	const results = await cloudinary.search
		.expression(`folder:fiorelli/backgroundImages/*`)
		.sort_by(`public_id`, `desc`)
		.max_results(30)
		.execute();
	console.log(results);
	return (
		<div>
			<h1>Gallery</h1>
			<button> Images</button>
		</div>
	);
};
export default Gallery;
