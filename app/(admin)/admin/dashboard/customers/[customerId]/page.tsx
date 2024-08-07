import Table from "@/app/(admin)/admin/dashboard/components/components/Table";
import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";
import { getMessagesByCustomerId } from "@/app/utilities/databaseFunctions/message.db";
import { useDeviceType } from "@/app/utilities/hooks.server";
import Link from "next/link";
import { FC } from "react";

interface CustomerProps {
	params: {
		customerId: number;
	};
}

const Customer: FC<CustomerProps> = async ({ params: { customerId } }) => {
	const isMobile = useDeviceType();
	const customerWithMessages = await getMessagesByCustomerId(Number(customerId));
	if (customerWithMessages instanceof Error) {
		throw customerWithMessages;
	}

	return (
		<>
			<Title title={`Messages from ${customerWithMessages.name}`} />
			<div>
				<span className="font-semibold">Email:</span>{" "}
				<Link
					href={`mailto:${customerWithMessages.email}`}
					className={`cursor-pointer active:text-cyan-500 dark:active:text-cyan-300 ${
						!isMobile && "hover:underline  hover:text-cyan-700 dark:hover:text-cyan-400"
					}`}
					aria-label={`Go to ${customerWithMessages.email}`}
				>
					{customerWithMessages.email}
				</Link>
			</div>
			<AdminButtonLink text="Go Back" goBack isMobile={isMobile} />
			<Table data={customerWithMessages.messages} isMobile={isMobile} />
		</>
	);
};

export default Customer;
