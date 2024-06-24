import AnimateWrapper from "../components/components/AnimateWrapper";
import Card from "../components/components/Card";
import GallerySliderWrapper from "./components/GallerySliderWrapper";

const sliderSections = [
	// { title: "The Cormorant", tag: "EJ_Guitar" },
	// { title: "The Sea Eagle", tag: "HB_Guitar" },
	{ title: "The Kestrel", tag: "SP_Guitar" },
	{ title: "The Starling", tag: "E_Guitar" },
	// { title: "Signore Fiorelli", tag: "jamie" },
];

const Gallery = async () => {
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
