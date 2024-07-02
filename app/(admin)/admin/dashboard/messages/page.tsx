import AnimateWrapper from "@/app/components/AnimateWrapper";
import { getMessages } from "@/app/utilities/databaseFunctions";
import Table from "@/app/(admin)/components/Table";

export default async function Messages() {
	const messages = await getMessages();

	return (
		<AnimateWrapper>
			<div className="flex flex-col justify-center items-center gap-4">
				<div className="text-4xl font-semibold">Messages</div>
				<Table data={messages} />
			</div>
		</AnimateWrapper>
	);
}
