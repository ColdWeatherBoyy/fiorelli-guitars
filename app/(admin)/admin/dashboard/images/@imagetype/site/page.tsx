import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import { useDeviceType } from "@/app/utilities/hooks.server";

const SiteImages = async () => {
	const isMobile = useDeviceType();

	return (
		<>
			<Title title="Site Images" />
		</>
	);
};

export default SiteImages;
