import { getMessages } from "@/app/utilities/databaseFunctions";
import AdminButtonLink from "../../components/AdminButtonLink";
import Table from "../../components/Table";

export default async function Messages() {
	const messages = await getMessages();

	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<div className="text-4xl font-semibold text-zinc-950">Messages</div>
			<AdminButtonLink href="/admin" text="Go Back" />
			<Table data={messages} />
		</div>
	);
}
