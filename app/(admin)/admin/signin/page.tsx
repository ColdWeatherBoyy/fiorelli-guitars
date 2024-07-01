// import { signIn } from "@/auth";

// export default function SignIn() {
// 	return (
// 		<div className="w-full flex flex-col items-center justify-start gap-4">
// 			<div className="text-4xl font-semibold text-zinc-950">Sign In</div>
// 			<div className="flex justify-evenly w-full">
// 				<form
// 					action={async () => {
// 						"use server";
// 						await signIn("google");
// 					}}
// 					className="flex flex-col gap-4 items-center justify-center border border-zinc-500 p-4 bg-zinc-100 rounded-lg shadow-md"
// 				>
// 					<label>Powered by Google</label>
// 					<button
// 						type="submit"
// 						className="border border-zinc-500 p-1 bg-zinc-100 rounded-lg"
// 					>
// 						Sign In
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// }

// export default function LoginPage() {
// 	return <LoginForm />;
// }
import { signIn } from "@/auth";

export default function SignIn() {
	return (
		<div className="w-fit flex flex-col items-center justify-start gap-4">
			<div className="text-4xl font-semibold text-zinc-950">Sign In</div>
			<div className="flex justify-evenly w-full">
				<form
					action={async () => {
						"use server";
						await signIn("github", { redirectTo: "/admin" });
					}}
					className="flex flex-col gap-4 items-center justify-center border border-zinc-500 p-4 bg-zinc-100 rounded-lg shadow-md"
				>
					<label>Powered by Google</label>
					<button
						type="submit"
						className="border border-zinc-500 p-1 bg-zinc-100 rounded-lg"
					>
						Sign In
					</button>
				</form>
			</div>
		</div>
	);
}
