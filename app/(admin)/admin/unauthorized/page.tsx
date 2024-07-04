import AnimateWrapper from "@/app/components/AnimateWrapper";
import AdminButtonLink from "../../components/AdminButtonLink";
import { useDeviceType } from "@/app/utilities/hooks.server";

const Unauthorized = () => {
	const isMobile = useDeviceType();
	return (
		<AnimateWrapper>
			<div className="w-fit flex flex-col items-center justify-start gap-4">
				<div className="text-4xl font-semibold">Unauthorized Access</div>
				<div className="flex flex-col items-center justify-center gap-4 w-full border border-zinc-500 p-4 bg-zinc-100 rounded-lg shadow-sm shadow-slate-400 dark:shadow-slate-900">
					<div className="text-lg">You are not authorized to view this page.</div>
					<AdminButtonLink
						href="/admin/signin"
						text="Return to Sign In"
						isMobile={isMobile}
					/>
				</div>
			</div>
		</AnimateWrapper>
	);
};

export default Unauthorized;
