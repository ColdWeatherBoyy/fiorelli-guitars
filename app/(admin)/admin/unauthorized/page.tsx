import AnimateWrapper from "@/app/components/AnimateWrapper";
import AdminButtonLink from "../../components/AdminButtonLink";
import { useDeviceType } from "@/app/utilities/hooks.server";
import AuthCard from "../../components/AuthCard";

const Unauthorized = () => {
	const isMobile = useDeviceType();
	return (
		<AuthCard title="Unauthorized Access">
			<div className="text-lg">You are not authorized to view this page.</div>
			<div className="flex flex-col gap-4 sm:flex-row">
				<AdminButtonLink
					href="/admin/signin"
					text="Return to Sign In"
					isMobile={isMobile}
				/>
				<AdminButtonLink href="/" text="Go to Site" isMobile={isMobile} />
			</div>
		</AuthCard>
	);
};

export default Unauthorized;
