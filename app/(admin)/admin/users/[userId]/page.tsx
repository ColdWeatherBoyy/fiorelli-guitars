import Table from "@/app/(admin)/components/Table";
import {
	getMessagesByUserByEmail,
	getMessagesByUserId,
} from "@/app/utilities/databaseFunctions";
import Link from "next/link";
import { FC } from "react";

interface UserProps {
	params: {
		userId: number;
	};
}

const User: FC<UserProps> = async ({ params: { userId } }) => {
	const userWithMessages = await getMessagesByUserId(Number(userId));

	return (
		<div className="flex flex-col w-full items-center gap-2">
			<div className="text-4xl font-semibold text-zinc-950">
				Messages from {userWithMessages.name}
			</div>
			<div>
				<span className="font-semibold">Email:</span> {userWithMessages.email}
			</div>
			<Link href="/admin" className="border border-zinc-500 p-1 bg-zinc-100 rounded-lg">
				Go Back
			</Link>
			<Table data={userWithMessages.messages} />
		</div>
	);
};

export default User;
