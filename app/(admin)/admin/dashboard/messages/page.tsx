import Table from "@/app/(admin)/admin/dashboard/components/components/Table";
import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import { getMessages } from "@/app/utilities/databaseFunctions/message.db";
import { useDeviceType } from "@/app/utilities/hooks.server";

export default async function Messages() {
	const isMobile = useDeviceType();
	const messages = await getMessages();
	if (messages instanceof Error) {
		throw messages;
	}

	return (
		<>
			<Title title="Messages" />
			<Table data={messages} isMobile={isMobile} />
		</>
	);
}
