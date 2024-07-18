import { auth } from "@/auth";
import Title from "./components/components/Title";

export default async function AdminHome() {
	const session = await auth();
	return (
		<>
			<Title title="Admin Dashboard" />
			<div className="text-lg">Welcome, {session?.user?.name?.split(" ")[0]}</div>
		</>
	);
}
