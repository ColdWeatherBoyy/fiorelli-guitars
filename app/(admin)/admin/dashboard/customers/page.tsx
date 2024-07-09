import Table from "@/app/(admin)/components/Table";
import Title from "@/app/(admin)/components/Title";
import { getCustomers } from "@/app/utilities/databaseFunctions";
import { useDeviceType } from "@/app/utilities/hooks.server";

const Customers = async () => {
	const isMobile = useDeviceType();
	const customers = await getCustomers();

	return (
		<>
			<Title title="Customers" />
			<Table data={customers} isMobile={isMobile} />
		</>
	);
};

export default Customers;
