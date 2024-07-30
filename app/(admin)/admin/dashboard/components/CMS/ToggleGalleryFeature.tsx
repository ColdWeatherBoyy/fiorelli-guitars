import Toggle from "@/app/(admin)/components/components/Toggle";
import { FC } from "react";

interface ToggleGalleryFeatureProps {
	isToggled: boolean;
	isMobile: boolean;
	handleToggle: () => void;
}

const ToggleGalleryFeature: FC<ToggleGalleryFeatureProps> = ({
	isToggled,
	isMobile,
	handleToggle,
}) => {
	return (
		<div className="flex flex-col gap-2 p-2 text-center">
			<div className="underline">Feature Variant in Gallery?</div>
			<Toggle
				isToggled={isToggled}
				handleToggle={handleToggle}
				optionOne="Yes"
				optionTwo="No"
				isMobile={isMobile}
			/>
		</div>
	);
};

export default ToggleGalleryFeature;
