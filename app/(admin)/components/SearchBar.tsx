"use client";

import { FC, useEffect } from "react";
import { useFormState } from "react-dom";
import { handleSearchForm } from "../utilities/formHandlers";
import { useRouter } from "next/navigation";
import AdminButtonLink from "./AdminButtonLink";

interface SearchBarProps {
	placeholder: string;
	isMobile: boolean;
}

const SearchBar: FC<SearchBarProps> = ({ placeholder, isMobile }) => {
	const [data, formAction] = useFormState(handleSearchForm, null);
	const router = useRouter();
	useEffect(() => {
		if (data === null) return;
		router.push(`/admin/dashboard/customers/${data}`);
	}, [data, router]);
	return (
		<form action={formAction} className="flex gap-4">
			<input
				type="text"
				placeholder={placeholder}
				required
				name="query"
				className={`p-2 rounded-sm border border-slate-400 dark:border-slate-500 dark:placeholder-zinc-200 bg-zinc-50 dark:bg-zinc-600 shadow-inner-outer focus:shadow-md shadow-slate-400 dark:shadow-slate-900 focus:shadow-sm focus:shadow-slate-400 dark:focus:shadow-slate-900 focus:outline-0 focus:ring-1 focus:ring-cyan-400 dark:focus:ring-cyan-800 focus:ring-opacity-50 transition-all ease-in-out duration-200`}
			/>
			<AdminButtonLink text="Search" isMobile={isMobile} />
		</form>
	);
};
export default SearchBar;
