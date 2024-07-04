import AnimateWrapper from "@/app/components/AnimateWrapper";
import { signIn } from "@/auth";
import AdminButtonLink from "../../components/AdminButtonLink";
import { useDeviceType } from "@/app/utilities/hooks.server";

const SignIn = () => {
	const isMobile = useDeviceType();
	return (
		<AnimateWrapper>
			<div className="flex flex-col justify-center items-center gap-4">
				<div className="text-4xl font-semibold">Sign In</div>
				<form
					action={async () => {
						"use server";
						await signIn("google", { redirectTo: "/admin/dashboard" });
					}}
					className="flex flex-col gap-4 items-center justify-center border border-zinc-500 p-4 bg-zinc-100 rounded-lg shadow-sm shadow-slate-400 dark:shadow-slate-900"
				>
					<label>Powered by Google</label>
					<AdminButtonLink text="Sign In" isMobile={isMobile} />
				</form>
			</div>
		</AnimateWrapper>
	);
};

export default SignIn;
