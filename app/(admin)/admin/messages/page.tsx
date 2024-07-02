import { getMessages } from "@/app/utilities/databaseFunctions";
import AdminButtonLink from "../../components/AdminButtonLink";
import Table from "../../components/Table";
import AnimateWrapper from "@/app/components/AnimateWrapper";

export default async function Messages() {
	const messages = await getMessages();

	return (
		<AnimateWrapper>
			<div className="flex flex-col justify-center items-center gap-4">
				<div className="text-4xl font-semibold">Messages</div>
				<AdminButtonLink href="/admin" text="Go Back" />
				<Table data={messages} />
			</div>
		</AnimateWrapper>
	);
}
