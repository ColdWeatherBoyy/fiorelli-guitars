import Table from "@/app/(admin)/components/Table";
import { getMessagesByCustomerId } from "@/app/utilities/databaseFunctions";
import Link from "next/link";
import { FC } from "react";

interface CustomerProps {
	params: {
		customerId: number;
	};
}

const Customer: FC<CustomerProps> = async ({ params: { customerId } }) => {
	const customerWithMessages = await getMessagesByCustomerId(Number(customerId));

	return (
		<div className="flex flex-col w-full items-center gap-2">
			<div className="text-4xl font-semibold text-zinc-950">
				Messages from {customerWithMessages.name}
			</div>
			<div>
				<span className="font-semibold">Email:</span> {customerWithMessages.email}
			</div>
			<Link href="/admin" className="border border-zinc-500 p-1 bg-zinc-100 rounded-lg">
				Go Back
			</Link>
			<Table data={customerWithMessages.messages} />
		</div>
	);
};

export default Customer;
