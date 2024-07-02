import { formatDateTime, toTitleCase } from "@/app/utilities/helpers";
import { FC } from "react";

interface TableProps {
	data: Array<Record<string, any>>;
}

const Table: FC<TableProps> = ({ data }) => {
	if (!data.length) return <div>No data available</div>;

	const headers = Object.keys(data[0]);

	return (
		<table className="shadow-lg rounded-md">
			<thead>
				<tr>
					{headers.map((header) => (
						<th
							key={header}
							className="bg-zinc-400 dark:bg-zinc-700 p-4 border border-slate-600 dark:border-slate-400 text-center text-2xl font-semibold"
						>
							{header === "createdAt" ? "Date Created" : toTitleCase(header)}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((item, rowIndex) => (
					<tr
						key={rowIndex}
						className={`${
							rowIndex % 2 === 0
								? "bg-slate-200 dark:bg-slate-500"
								: "bg-zinc-50 dark:bg-zinc-500"
						}`}
					>
						{Object.values(item).map((value, index) => (
							<td
								key={index}
								className="border border-slate-600 dark:border-slate-400 p-2 text-left text-base text-zinc-950 dark:text-zinc-50"
							>
								{typeof value === "object" && value instanceof Date
									? formatDateTime(value.toString())
									: value}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
