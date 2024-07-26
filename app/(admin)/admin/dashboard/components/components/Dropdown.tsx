"use client";

import { camelToTitleCase } from "@/app/utilities/helpers";
import { FC, useEffect, useState } from "react";

interface DropdownProps {
	setValue: (value: string) => void;
	updatedValue: any;
	defaultValue: string;
	options: string[];
}

const Dropdown: FC<DropdownProps> = ({
	setValue,
	updatedValue,
	defaultValue,
	options,
}) => {
	const [key, setKey] = useState(0);

	useEffect(() => {
		setKey((prevKey) => prevKey + 1);
	}, [updatedValue]);

	return (
		<select
			key={key}
			onChange={(e) => setValue(e.target.value)}
			defaultValue=""
			className="p-2 rounded-sm border border-slate-400 dark:border-slate-500 dark:placeholder-zinc-200 bg-zinc-50 dark:bg-zinc-600 shadow-inner-outer focus:shadow-md shadow-slate-400 dark:shadow-slate-900 focus:shadow-sm focus:shadow-slate-400 dark:focus:shadow-slate-900 focus:outline-0 focus:ring-1 focus:ring-cyan-400 dark:focus:ring-cyan-800 focus:ring-opacity-50 transition-all ease-in-out duration-200"
		>
			<option value="" disabled>
				{defaultValue}
			</option>
			{options.map((option, index) => (
				<option key={option + "-" + index} value={option}>
					{camelToTitleCase(option)}
				</option>
			))}
		</select>
	);
};

export default Dropdown;
