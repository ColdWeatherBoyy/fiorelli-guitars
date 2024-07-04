import Table from "@/app/(admin)/components/Table";
import Title from "@/app/(admin)/components/Title";
import { getCustomers } from "@/app/utilities/databaseFunctions";

const Customers = async () => {
	const customers = await getCustomers();

	return (
		<>
			<Title title="Customers" />
			<Table data={customers} />
		</>
	);
};

export default Customers;
