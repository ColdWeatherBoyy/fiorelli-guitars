import { getAuthUsers } from "@/app/utilities/databaseFunctions";
import { useDeviceType } from "@/app/utilities/hooks.server";
import AdminUsersLayout from "./components/AdminUsersLayout";

const AdminUsers = async () => {
	const isMobile = useDeviceType();
	const authUsers = await getAuthUsers();
	if (authUsers instanceof Error) {
		throw authUsers;
	}

	return <AdminUsersLayout authUsers={authUsers} isMobile={isMobile} />;
};

export default AdminUsers;
