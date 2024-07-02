import AnimateWrapper from "@/app/components/AnimateWrapper";
import AdminButtonLink from "../../components/AdminButtonLink";
import { signIn } from "@/auth";

export default function SignIn() {
	return (
		<AnimateWrapper>
			<div className="flex flex-col justify-center items-center gap-4">
				<div className="text-4xl font-semibold">Sign In</div>
				<form
					action={async () => {
						"use server";
						await signIn("google", { redirectTo: "/admin" });
					}}
					className="flex flex-col gap-4 items-center justify-center border border-zinc-500 p-4 bg-zinc-100 rounded-lg shadow-md"
				>
					<label>Powered by Google</label>
					<AdminButtonLink text="Sign In" />
				</form>
			</div>
		</AnimateWrapper>
	);
}
