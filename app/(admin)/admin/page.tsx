import Link from "next/link";
import SearchBar from "../components/SearchBar";
import AdminButtonLink from "../components/AdminButtonLink";

export default async function AdminHome() {
	return (
		<div className="w-full flex flex-col items-center justify-start gap-4">
			<div className="text-4xl font-semibold text-zinc-950">Welcome</div>
			<div className="flex justify-evenly w-full">
				<AdminButtonLink href="/admin/customers" text="Customers" />
				<AdminButtonLink href="/admin/messages" text="Recent Messages" />
			</div>
			<SearchBar label="Search for Customer" placeholder="Email or Name" />
		</div>
	);
}
