import { getUsers } from "@/app/utilities/databaseFunctions";
import UserTable from "../components/UserTable";
import { User } from "@prisma/client";

export default async function Home() {
	const users = await getUsers();

	return <UserTable users={users} />;
}
