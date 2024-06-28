"use client";

import { FC, useEffect } from "react";
import { useFormState } from "react-dom";
import { handleForm } from "../utilities/handleForm";
import { useRouter } from "next/navigation";

interface SearchBarProps {
	label: string;
	placeholder: string;
}

const SearchBar: FC<SearchBarProps> = ({ label, placeholder }) => {
	const [data, formAction] = useFormState(handleForm, null);
	const router = useRouter();
	useEffect(() => {
		if (data === null) return;
		router.push(`/admin/users/${data}`);
	}, [data, router]);
	return (
		<form action={formAction} className="flex flex-col border border-zinc-500 gap-2 p-4">
			<label className="text-xl ">{label}</label>
			<input
				type="text"
				placeholder={placeholder}
				required
				name="query"
				className="p-2"
			/>
			<button
				className="mx-8 border border-zinc-500 p-1 bg-zinc-100 rounded-lg"
				type="submit"
			>
				Search
			</button>
		</form>
	);
};
export default SearchBar;
