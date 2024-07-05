import AnimateWrapper from "@/app/components/AnimateWrapper";
import { signIn } from "@/auth";
import AdminButtonLink from "../../components/AdminButtonLink";
import { useDeviceType } from "@/app/utilities/hooks.server";
import Title from "../../components/Title";
import FullLogo from "@/app/components/SVGs/FullLogo";
import Link from "next/link";
import AuthCard from "../../components/AuthCard";

const SignIn = () => {
	const isMobile = useDeviceType();

	return (
		<AuthCard title="Admin Sign In">
			<form
				action={async () => {
					"use server";
					await signIn("google", { redirectTo: "/admin/dashboard" });
				}}
				className="mt-4 flex flex-col gap-4 items-center justify-center"
			>
				<AdminButtonLink text="Sign In" isMobile={isMobile} />
				<label className="text-sm">Powered by Google</label>
			</form>
		</AuthCard>
	);
};

export default SignIn;
