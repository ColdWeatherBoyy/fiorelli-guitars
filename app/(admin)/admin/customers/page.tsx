import { getCustomers } from "@/app/utilities/databaseFunctions";
import Table from "../../components/Table";
import Link from "next/link";
import AdminButtonLink from "../../components/AdminButtonLink";
import AnimateWrapper from "@/app/components/AnimateWrapper";

export default async function Customers() {
	const customers = await getCustomers();

	return (
		<AnimateWrapper>
			<div className="flex flex-col justify-center items-center gap-4">
				<div className="text-4xl font-semibold">Customers</div>
				<AdminButtonLink href="/admin" text="Go Back" />
				<Table data={customers} />
			</div>
		</AnimateWrapper>
	);
}
