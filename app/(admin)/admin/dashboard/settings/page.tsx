import AddAuthUserForm from "@/app/(admin)/components/AddAuthUserForm";
import Table from "@/app/(admin)/components/Table";
import Title from "@/app/(admin)/components/Title";
import { getAuthUsers } from "@/app/utilities/databaseFunctions";
import { useDeviceType } from "@/app/utilities/hooks.server";

const Settings = async () => {
	const isMobile = useDeviceType();
	const authUsers = await getAuthUsers();

	return (
		<>
			<Title title="Settings" />
			<AddAuthUserForm isMobile={isMobile} />
			<Table data={authUsers} />
		</>
	);
};

export default Settings;
