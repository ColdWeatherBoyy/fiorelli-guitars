import Link from "next/link";
import Card from "../components/components/Card";
import { cloudinary } from "../utilities/cloudinary";
import GallerySlider from "./components/GallerySlider";
import AnimateWrapper from "../components/components/AnimateWrapper";

const Gallery = async () => {
	// total_count and time also available
	// const { resources: cormorantResources } = await cloudinary.search
	// 	.expression(`tags=EJ_Guitar`)
	// 	.sort_by(`public_id`, `desc`)
	// 	.max_results(30)
	// 	.execute();
	// const { resources: kestrelResources } = await cloudinary.search
	// 	.expression(`tags=SP_Guitar`)
	// 	.sort_by(`public_id`, `desc`)
	// 	.max_results(30)
	// 	.execute();
	// const { resources: seaEagleResources } = await cloudinary.search
	// 	.expression(`tags=HB_Guitar`)
	// 	.sort_by(`public_id`, `desc`)
	// 	.max_results(30)
	// 	.execute();
	// const { resources: starlingResources } = await cloudinary.search
	// 	.expression(`tags=E_Guitar`)
	// 	.sort_by(`public_id`, `desc`)
	// 	.max_results(30)
	// 	.execute();
	// const { resources: jamieResources } = await cloudinary.search
	// 	.expression(`tags=jamie`)
	// 	.sort_by(`public_id`, `desc`)
	// 	.max_results(30)
	// 	.execute();

	// console.log(jamieResources);
	return (
		<AnimateWrapper>
			<Card title="Gallery">
				<div className="flex flex-col gap-4">
					<div className="absolute z-50">
						<Link href="/photo/1">modal</Link>
					</div>
					{/* <GallerySlider title="The Cormorant" resources={cormorantResources} />
				<GallerySlider title="The Kestrel" resources={kestrelResources} />
				<GallerySlider title="The Sea Eagle" resources={seaEagleResources} /> */}
					{/* <GallerySlider title="The Starling" resources={starlingResources} /> */}
					{/* <GallerySlider title="Signore Fiorelli" resources={jamieResources} /> */}
				</div>
			</Card>
		</AnimateWrapper>
	);
};
export default Gallery;
