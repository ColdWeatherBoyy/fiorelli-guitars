import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import { useDeviceType } from "@/app/utilities/hooks.server";
import Uploader from "../../components/Uploader";

const GuitarImages = async () => {
	const isMobile = useDeviceType();

	return (
		<>
			<Title title="Guitar Images" />
			<Uploader isMobile={isMobile} />
		</>
	);
};

export default GuitarImages;
