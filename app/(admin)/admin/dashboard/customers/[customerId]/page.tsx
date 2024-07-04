import AdminButtonLink from "@/app/(admin)/components/AdminButtonLink";
import Table from "@/app/(admin)/components/Table";
import Title from "@/app/(admin)/components/Title";
import { getMessagesByCustomerId } from "@/app/utilities/databaseFunctions";
import { useDeviceType } from "@/app/utilities/hooks.server";
import Link from "next/link";
import { FC } from "react";

interface CustomerProps {
	params: {
		customerId: number;
	};
}

const Customer: FC<CustomerProps> = async ({ params: { customerId } }) => {
	const customerWithMessages = await getMessagesByCustomerId(Number(customerId));
	const isMobile = useDeviceType();

	return (
		<>
			<Title title={`Messages from ${customerWithMessages.name}`} />
			<div className="text-center max-w-16">
				<span className="font-semibold">Email:</span>{" "}
				<Link href={`mailto:${customerWithMessages.email}`}>
					{customerWithMessages.email}
				</Link>
			</div>
			<AdminButtonLink text="Go Back" goBack isMobile={isMobile} />
			<Table data={customerWithMessages.messages} />
		</>
	);
};

export default Customer;
