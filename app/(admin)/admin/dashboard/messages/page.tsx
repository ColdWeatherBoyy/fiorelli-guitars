import Table from "@/app/(admin)/components/Table";
import Title from "@/app/(admin)/components/Title";
import { getMessages } from "@/app/utilities/databaseFunctions";

export default async function Messages() {
	const messages = await getMessages();

	return (
		<>
			<Title title="Messages" />
			<Table data={messages} />
		</>
	);
}
