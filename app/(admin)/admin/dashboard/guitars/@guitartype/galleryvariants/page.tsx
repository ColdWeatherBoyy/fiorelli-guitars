import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import { getAllGalleryVariantGuitarModels } from "@/app/utilities/databaseFunctions/variantguitar.db";
import { useDeviceType } from "@/app/utilities/hooks.server";
import SelectEditableLayout from "../../../components/CMS/SelectableEditableLayout";
import { GuitarSpec } from "@prisma/client";

const GalleryVariantModels = async () => {
	const isMobile = useDeviceType();
	const galleryVariantModels = await getAllGalleryVariantGuitarModels();
	if (galleryVariantModels instanceof Error) {
		throw galleryVariantModels;
	}

	const titlesArray = galleryVariantModels.guitarModelsWithSpecs.map((guitar) => {
		return `${guitar.name}, ${guitar.colorScheme}`;
	});

	// To-Do: Why do I need type assertion here?
	const guitarSpecs = galleryVariantModels.guitarModelsWithSpecs.map((guitar) => {
		return guitar.guitarSpec as GuitarSpec;
	});

	// To-Do: Do Something with guitarModelsWithoutSpecs

	return (
		<>
			<Title title="Gallery Variant Models" />
			<SelectEditableLayout
				content={guitarSpecs}
				titlesArray={titlesArray}
				isMobile={isMobile}
			/>
		</>
	);
};

export default GalleryVariantModels;
