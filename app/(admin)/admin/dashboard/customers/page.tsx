import Table from "@/app/(admin)/components/Table";
import AnimateWrapper from "@/app/components/AnimateWrapper";
import { getCustomers } from "@/app/utilities/databaseFunctions";

const Customers = async () => {
	const customers = await getCustomers();

	return (
		<AnimateWrapper>
			<div className="flex flex-col justify-center items-center gap-4">
				<div className="text-4xl font-semibold">Customers</div>
				<Table data={customers} />
			</div>
		</AnimateWrapper>
	);
};

export default Customers;
