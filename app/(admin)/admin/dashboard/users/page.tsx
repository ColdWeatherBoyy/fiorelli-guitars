import { getAuthUsers } from "@/app/utilities/databaseFunctions";
import { useDeviceType } from "@/app/utilities/hooks.server";
import AdminUsersLayout from "./AdminUsersLayout";

const AdminUsers = async () => {
	const isMobile = useDeviceType();
	const authUsers = await getAuthUsers();

	return <AdminUsersLayout authUsers={authUsers} isMobile={isMobile} />;
};

export default AdminUsers;
