import { getAllGuitarSpecs } from "@/app/utilities/databaseFunctions";
import AnimateWrapper from "../../components/AnimateWrapper";
import Card from "../components/components/Card";
import GallerySliderWrapper from "./components/GallerySliderWrapper";

const Gallery = async () => {
	const allGuitarSpecs = await getAllGuitarSpecs();
	if (allGuitarSpecs instanceof Error) {
		throw allGuitarSpecs;
	}
	const sliderSections = allGuitarSpecs.map((guitar) => ({
		title: guitar.name,
		tag: guitar.tag,
	}));

	return (
		<AnimateWrapper>
			<Card title="Gallery">
				{sliderSections.map((section, index) => (
					<GallerySliderWrapper
						key={section.tag + index}
						title={section.title}
						tag={section.tag}
					/>
				))}
			</Card>
		</AnimateWrapper>
	);
};
export default Gallery;
