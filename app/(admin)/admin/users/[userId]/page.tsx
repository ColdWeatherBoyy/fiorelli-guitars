import Table from "@/app/(admin)/components/Table";
import {
	getMessagesByUserByEmail,
	getMessagesByUserId,
} from "@/app/utilities/databaseFunctions";
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
			<div className="text-4xl">Messages from {userWithMessages.name}</div>
			<div>
				<span className="font-semibold">Email:</span> {userWithMessages.email}
			</div>
			<Table data={userWithMessages.messages} />
		</div>
	);
};

export default User;
