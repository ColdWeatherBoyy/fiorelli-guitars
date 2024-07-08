import AddAuthUserForm from "@/app/(admin)/components/AddAuthUserForm";
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
			<div className="flex flex-col gap-2">
				{authUsers.map((authUser) => (
					<div key={authUser} className="flex flex-col gap-1">
						<p>{authUser}</p>
					</div>
				))}
			</div>
		</>
	);
};

export default Settings;
