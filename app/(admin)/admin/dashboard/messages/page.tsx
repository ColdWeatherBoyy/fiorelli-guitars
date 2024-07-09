import Table from "@/app/(admin)/components/Table";
import Title from "@/app/(admin)/components/Title";
import { getMessages } from "@/app/utilities/databaseFunctions";
import { useDeviceType } from "@/app/utilities/hooks.server";

export default async function Messages() {
	const isMobile = useDeviceType();
	const messages = await getMessages();

	return (
		<>
			<Title title="Messages" />
			<Table data={messages} isMobile={isMobile} />
		</>
	);
}
