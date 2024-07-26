import { getAllGalleryVariantGuitarModels } from "@/app/utilities/databaseFunctions/variantguitar.db";
import AnimateWrapper from "../../components/AnimateWrapper";
import Card from "../components/components/Card";
import GallerySliderWrapper from "./components/GallerySliderWrapper";

const Gallery = async () => {
	const allGuitarSpecs = await getAllGalleryVariantGuitarModels();
	if (allGuitarSpecs instanceof Error) {
		throw allGuitarSpecs;
	}
	const sliderSections = allGuitarSpecs.guitarModelsWithSpecs.map((guitar) => ({
		title: guitar.name + ", " + guitar.colorScheme,
		tag: guitar.variantTag,
	}));

	// To-Do: Do Something with guitarModelsWithoutSpecs

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
