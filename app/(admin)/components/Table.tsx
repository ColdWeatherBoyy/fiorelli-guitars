import { formatDateTime } from "@/app/utilities/helpers";
import { FC } from "react";

interface TableProps {
	data: Array<Record<string, any>>;
}

const Table: FC<TableProps> = ({ data }) => {
	if (!data.length) return <div>No data available</div>;

	const headers = Object.keys(data[0]);

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
				{data.map((item, rowIndex) => (
					<tr
						key={rowIndex}
						className={`${rowIndex % 2 === 0 ? "bg-cyan-50" : "bg-zinc-100"}`}
					>
						{Object.values(item).map((value, index) => (
							<td
								key={index}
								className="border border-zinc-400 p-2 text-left text-base text-zinc-950"
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
