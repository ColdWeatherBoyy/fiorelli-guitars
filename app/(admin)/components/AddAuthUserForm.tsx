"use client";

import { FC } from "react";
import { useFormState } from "react-dom";
import { handleAddAuthUserForm } from "../utilities/formHandlers";
import AdminButtonLink from "./AdminButtonLink";
import { isAuthUser } from "@/app/utilities/typeguardFunctions";

interface AddAuthUserFormProps {
	isMobile: boolean;
}

const AddAuthUserForm: FC<AddAuthUserFormProps> = ({ isMobile }) => {
	const [data, formAction] = useFormState(handleAddAuthUserForm, null);

	return (
		<div className="flex flex-col gap-4">
			<form action={formAction} className="flex gap-4">
				<input
					type="email"
					placeholder="Add email for new user"
					required
					name="email"
					className={`p-2 rounded-sm border border-slate-400 dark:border-slate-500 dark:placeholder-zinc-200 bg-zinc-50 dark:bg-zinc-600 shadow-inner-outer focus:shadow-md shadow-slate-400 dark:shadow-slate-900 focus:shadow-sm focus:shadow-slate-400 dark:focus:shadow-slate-900 focus:outline-0 focus:ring-1 focus:ring-cyan-400 dark:focus:ring-cyan-800 focus:ring-opacity-50 transition-all ease-in-out duration-200`}
				/>
				<AdminButtonLink text="Search" isMobile={isMobile} />
			</form>
			{data === null ? null : isAuthUser(data) ? (
				<div className="flex flex-col gap-2">
					<div className="font-semibold">User added!</div>
					<div className="font-semibold">Email: {data.email}</div>
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<div className="font-semibold">Error: {data.name}</div>
					<div className="font-semibold">{data.message}</div>
				</div>
			)}
		</div>
	);
};

export default AddAuthUserForm;
