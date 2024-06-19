import Card from "@/app/components/components/Card";
import { backgroundImageCarousel } from "@/app/utilities/constants";
import Image from "next/image";

const GallerySlider = () => {
	return (
		<Card title="The Cormorant">
			<div className="flex overflow-scroll gap-4 items-center">
				{backgroundImageCarousel.map((image, index) => (
					<div key={index}>
						<Image
							src={image.src}
							alt={image.alt}
							placeholder="blur"
							quality={100}
							sizes="50px"
						/>
					</div>
				))}
			</div>
		</Card>
	);
};

export default GallerySlider;
