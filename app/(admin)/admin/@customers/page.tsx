import { getCustomers } from "@/app/utilities/databaseFunctions";
import Table from "../../components/Table";
import AdminButtonLink from "../../components/AdminButtonLink";
import AnimateWrapper from "@/app/components/AnimateWrapper";
import Link from "next/link";

export default async function Customers() {
	const customers = await getCustomers();

	return (
		<AnimateWrapper>
			<div className="flex flex-col justify-center items-center gap-4">
				<Link href="/admin/customers" className="text-4xl font-semibold">
					Customers
				</Link>
				{/* <AdminButtonLink href="/admin" text="Go Back" /> */}
				<Table data={customers} />
			</div>
		</AnimateWrapper>
	);
}
