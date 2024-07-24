import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import { getAllGalleryVariantGuitarModels } from "@/app/utilities/databaseFunctions/variantguitar.db";
import { useDeviceType } from "@/app/utilities/hooks.server";
import SelectEditableLayout from "../../components/CMS/SelectableEditableLayout";

const GalleryVariantModels = async () => {
	const isMobile = useDeviceType();
	const galleryVariantModels = await getAllGalleryVariantGuitarModels();
	if (galleryVariantModels instanceof Error) {
		throw galleryVariantModels;
	}

	const titlesArray = galleryVariantModels.map((guitar) => {
		return `${guitar.name}, ${guitar.colorScheme}`;
	});

	const guitarSpecs = galleryVariantModels.map((guitar) => {
		return guitar.guitarSpec;
	});

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
