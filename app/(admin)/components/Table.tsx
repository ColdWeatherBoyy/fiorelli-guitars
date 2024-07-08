import TrashCanIcon from "@/app/components/SVGs/TrashCanIcon";
import { formatDateTime, sortObjectKeys, toTitleCase } from "@/app/utilities/helpers";
import { useDeviceType } from "@/app/utilities/hooks.server";
import { TableInteractionType } from "@/app/utilities/types";
import Link from "next/link";
import { FC } from "react";

interface TableProps {
	data: Array<Record<string, any>>;
	tableInteractionType?: TableInteractionType;
}

const Table: FC<TableProps> = ({ data, tableInteractionType = null }) => {
	const isMobile = useDeviceType();

	if (!data.length) return <div>No data available</div>;

	const sortedData = data.map((item) => sortObjectKeys(item, ["name", "content"]));
	const headers = Object.keys(sortedData[0]).filter((header) => header !== "id");
	if (tableInteractionType === TableInteractionType.delete)
		headers.push(TableInteractionType.delete);

	return (
		<table className={`shadow shadow-slate-400 dark:shadow-slate-900 z-20`}>
			<thead>
				<tr>
					{headers.map((header) => (
						<th
							key={header}
							className="bg-zinc-400 dark:bg-zinc-700 p-2 border border-slate-600 dark:border-slate-400 text-center text-2xl font-semibold"
						>
							{header === "createdAt"
								? "Sent"
								: header === "messages"
								? "Msgs"
								: toTitleCase(header)}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{sortedData.map((item, rowIndex) => (
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
									className="whitespace-nowrap text-center border border-slate-600 dark:border-slate-400 p-2 text-left text-base text-zinc-950 dark:text-zinc-50 max-w-[33dvw] overflow-auto"
								>
									{key !== "name" ? (
										typeof value === "object" && value instanceof Date ? (
											formatDateTime(value.toString())
										) : (
											value
										)
									) : (
										<Link
											href={`/admin/dashboard/customers/${item.id}`}
											className={`${
												!isMobile &&
												"hover:underline hover:text-cyan-700 dark:hover:text-cyan-400"
											} active:text-cyan-500 dark:active:text-cyan-300`}
										>
											{value}
										</Link>
									)}
								</td>
							);
						})}
						{tableInteractionType === TableInteractionType.delete && (
							<td className="border border-slate-600 dark:border-slate-400 p-2 text-zinc-950 dark:text-zinc-50">
								<div className="cursor-pointer w-fit m-auto">
									<TrashCanIcon id={item.id} />
								</div>
							</td>
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
