import Table from "@/app/(admin)/admin/dashboard/components/components/Table";
import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import { getCustomers } from "@/app/utilities/databaseFunctions/customer.db";
import { useDeviceType } from "@/app/utilities/hooks.server";

const Customers = async () => {
	const isMobile = useDeviceType();
	const customers = await getCustomers();
	if (customers instanceof Error) {
		throw customers;
	}

	return (
		<>
			<Title title="Customers" />
			<Table data={customers} isMobile={isMobile} />
		</>
	);
};

export default Customers;
