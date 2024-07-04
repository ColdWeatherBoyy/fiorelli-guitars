"use client";

import { FC, useEffect } from "react";
import { useFormState } from "react-dom";
import { handleForm } from "../utilities/handleForm";
import { useRouter } from "next/navigation";
import AdminButtonLink from "./AdminButtonLink";

interface SearchBarProps {
	label: string;
	placeholder: string;
}

const SearchBar: FC<SearchBarProps> = ({ label, placeholder }) => {
	const [data, formAction] = useFormState(handleForm, null);
	const router = useRouter();
	useEffect(() => {
		if (data === null) return;
		router.push(`/admin/dashboard/customers/${data}`);
	}, [data, router]);
	return (
		<form action={formAction} className="flex flex-col gap-2">
			<input
				type="text"
				placeholder={placeholder}
				required
				name="query"
				className="p-2"
			/>
			<AdminButtonLink text="Search" />
		</form>
	);
};
export default SearchBar;
