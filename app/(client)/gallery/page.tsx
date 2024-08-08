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
				<div className="mt-6 w-[90%] md:w-[80%] lg:w-[80%] flex flex-col gap-8 justify-center items-center">
					{sliderSections.map((section, index) => (
						<GallerySliderWrapper
							key={section.tag + index}
							title={section.title}
							tag={section.tag}
						/>
					))}
				</div>
			</Card>
		</AnimateWrapper>
	);
};
export default Gallery;
