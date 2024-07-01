import Link from "next/link";
import SearchBar from "../components/SearchBar";

export default async function AdminHome() {
	return (
		<div className="w-full flex flex-col items-center justify-start gap-4">
			<div className="text-4xl font-semibold text-zinc-950">Welcome</div>
			<div className="flex justify-evenly w-full">
				<Link
					href="/admin/customers"
					className="border border-zinc-500 p-1 bg-zinc-100 rounded-lg"
				>
					Customers
				</Link>
				<Link
					href="/admin/messages"
					className="border border-zinc-500 p-1 bg-zinc-100 rounded-lg"
				>
					Recent Messages
				</Link>
			</div>
			<SearchBar label="Search for Customer" placeholder="Email or Name" />
		</div>
	);
}
