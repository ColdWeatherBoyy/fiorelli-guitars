import { useDeviceType } from "@/app/utilities/hooks.server";
import Title from "../components/components/Title";
import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";

const Images = async () => {
	const isMobile = useDeviceType();

	return (
		<>
			<Title title="Site Images" />
			<div className="flex justify-around w-full">
				<AdminButtonLink
					href="/admin/dashboard/images/site"
					text="Site Images"
					isMobile={isMobile}
				/>
				<AdminButtonLink
					href="/admin/dashboard/images/guitars"
					text="Guitar Images"
					isMobile={isMobile}
				/>
			</div>
		</>
	);
};

export default Images;
