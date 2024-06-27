import { getUsers } from "@/app/utilities/databaseFunctions";
import Table from "../../components/Table";
import Link from "next/link";

export default async function Users() {
	const users = await getUsers();

	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<div className="text-4xl font-semibold text-zinc-950">Messages</div>
			<Link href="/admin" className="border border-zinc-500 p-1 bg-zinc-100 rounded-lg">
				Go Back
			</Link>
			<Table data={users} />;
		</div>
	);
}
