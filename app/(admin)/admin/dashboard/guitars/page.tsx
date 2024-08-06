import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";
import { useDeviceType } from "@/app/utilities/hooks.server";

const Guitars = async () => {
	const isMobile = useDeviceType();
	return (
		<>
			<Title title="Guitar CMS" />
			<div className="flex justify-around w-full">
				<AdminButtonLink
					text="Base Models"
					href="/admin/dashboard/guitars/basemodels"
					isMobile={isMobile}
				/>
				<AdminButtonLink
					text="Variants"
					href="/admin/dashboard/guitars/variants"
					isMobile={isMobile}
				/>
				<AdminButtonLink
					text="Add Guitar"
					href="/admin/dashboard/guitars/addguitar"
					isMobile={isMobile}
				/>
			</div>
		</>
	);
};

export default Guitars;
