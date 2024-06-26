import { User } from "@prisma/client";
import { FC } from "react";

interface UserTableProps {
	users: User[];
}

const UserTable: FC<UserTableProps> = ({ users }) => {
	const headers = Object.keys(users[0]);
	return (
		<table className="shadow-lg rounded-md border border-zinc-400">
			<thead className="bg-zinc-300">
				<tr>
					{headers.map((header) => (
						<th
							key={header}
							className="p-4 border border-zinc-400 text-center text-2xl font-semibold text-zinc-950"
						>
							{header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{users.map((user, index) => (
					<tr
						key={user.email}
						className={`${index % 2 === 0 ? "bg-cyan-50" : "bg-zinc-100"}`}
					>
						{Object.values(user).map((value, index) => (
							<td
								key={index}
								className="border border-zinc-400 p-2 text-left text-base text-zinc-950"
							>
								{typeof value === "object" && value instanceof Date
									? value.toDateString()
									: value}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default UserTable;
