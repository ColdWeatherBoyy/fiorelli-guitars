import AnimateWrapper from "@/app/components/AnimateWrapper";
import AdminButtonLink from "../components/AdminButtonLink";
import SearchBar from "../components/SearchBar";

export default async function AdminHome() {
	return (
		<AnimateWrapper>
			<div className="w-full flex flex-col items-center justify-start gap-4">
				<div className="text-4xl font-semibold">Welcome</div>
				<AdminButtonLink href="/admin/customers" text="Customers" />
				<AdminButtonLink href="/admin/messages" text="Recent Messages" />
				<SearchBar label="Search for Customer" placeholder="Email or Name" />
			</div>
		</AnimateWrapper>
	);
}
