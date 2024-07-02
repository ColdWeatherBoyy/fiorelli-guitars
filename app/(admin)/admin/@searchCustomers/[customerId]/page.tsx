import AdminButtonLink from "@/app/(admin)/components/AdminButtonLink";
import Table from "@/app/(admin)/components/Table";
import AnimateWrapper from "@/app/components/AnimateWrapper";
import { getMessagesByCustomerId } from "@/app/utilities/databaseFunctions";
import { FC } from "react";

interface CustomerProps {
	params: {
		customerId: number;
	};
}

const Customer: FC<CustomerProps> = async ({ params: { customerId } }) => {
	const customerWithMessages = await getMessagesByCustomerId(Number(customerId));

	return (
		<AnimateWrapper>
			<div className="flex flex-col w-full items-center gap-2">
				<div className="text-4xl font-semibold">
					Messages from {customerWithMessages.name}
				</div>
				<div>
					<span className="font-semibold">Email:</span> {customerWithMessages.email}
				</div>
				<AdminButtonLink href="/admin" text="Go Back" />
				<Table data={customerWithMessages.messages} />
			</div>
		</AnimateWrapper>
	);
};

export default Customer;
