import AddAuthUserForm from "@/app/(admin)/components/AddAuthUserForm";
import Table from "@/app/(admin)/components/Table";
import Title from "@/app/(admin)/components/Title";
import TrashCanIcon from "@/app/components/SVGs/TrashCanIcon";
import { getAuthUsers } from "@/app/utilities/databaseFunctions";
import { useDeviceType } from "@/app/utilities/hooks.server";
import { TableInteractionType } from "@/app/utilities/types";

const AdminUsers = async () => {
	const isMobile = useDeviceType();
	const authUsers = await getAuthUsers();

	return (
		<>
			<Title title="Admins" />
			<AddAuthUserForm isMobile={isMobile} />
			<Table data={authUsers} tableInteractionType={TableInteractionType.delete} />
		</>
	);
};

export default AdminUsers;
