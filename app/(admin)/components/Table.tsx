import { formatDateTime, toTitleCase } from "@/app/utilities/helpers";
import Link from "next/link";
import { FC } from "react";

interface TableProps {
	data: Array<Record<string, any>>;
}

const Table: FC<TableProps> = ({ data }) => {
	if (!data.length) return <div>No data available</div>;

	const headers = Object.keys(data[0]).filter((header) => header !== "id");

	return (
		<table className="shadow shadow-slate-400 dark:shadow-slate-900 rounded-md">
			<thead>
				<tr>
					{headers.map((header) => (
						<th
							key={header}
							className="bg-zinc-400 dark:bg-zinc-700 p-2 border border-slate-600 dark:border-slate-400 text-center text-2xl font-semibold"
						>
							{header === "createdAt" ? "Sent" : toTitleCase(header)}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((item, rowIndex) => (
					<tr
						key={rowIndex}
						className={`${
							rowIndex % 2 !== 0
								? "bg-slate-200 dark:bg-slate-500"
								: "bg-zinc-50 dark:bg-zinc-500"
						}`}
					>
						{Object.entries(item).map(([key, value], index) => {
							if (key === "id") return;
							return (
								<td
									key={index}
									className="border border-slate-600 dark:border-slate-400 p-1 text-left text-base text-zinc-950 dark:text-zinc-50"
								>
									{item.id === undefined ? (
										typeof value === "object" && value instanceof Date ? (
											formatDateTime(value.toString())
										) : (
											value
										)
									) : (
										<Link href={`/admin/dashboard/customers/${item.id}`}>
											{typeof value === "object" && value instanceof Date
												? formatDateTime(value.toString())
												: value}
										</Link>
									)}
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
