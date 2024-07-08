"use client";

import { FC, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { handleAddAuthUserForm } from "../utilities/formHandlers";
import AdminButtonLink from "./AdminButtonLink";
import { isAuthUser } from "@/app/utilities/typeguardFunctions";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";

interface AddAuthUserFormProps {
	isMobile: boolean;
}

const AddAuthUserForm: FC<AddAuthUserFormProps> = ({ isMobile }) => {
	const [data, formAction] = useFormState(handleAddAuthUserForm, null);
	const [showMessage, setShowMessage] = useState<boolean>(false);

	useEffect(() => {
		if (data !== null) {
			setShowMessage(true);
			// setTimeout(() => {
			// 	setShowMessage(false);
			// }, 5000);
		}
	}, [data]);

	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			<form action={formAction} className="flex gap-4">
				<input
					type="email"
					placeholder="Add new admin email..."
					required
					name="email"
					className={`p-2 rounded-sm border border-slate-400 dark:border-slate-500 dark:placeholder-zinc-200 bg-zinc-50 dark:bg-zinc-600 shadow-inner-outer focus:shadow-md shadow-slate-400 dark:shadow-slate-900 focus:shadow-sm focus:shadow-slate-400 dark:focus:shadow-slate-900 focus:outline-0 focus:ring-1 focus:ring-cyan-400 dark:focus:ring-cyan-800 focus:ring-opacity-50 transition-all ease-in-out duration-200`}
				/>
				<AdminButtonLink text="Search" isMobile={isMobile} />
			</form>
			{showMessage &&
				(data === null ? null : isAuthUser(data) ? (
					<FormSuccess message={`${data.email} now authorized!`} />
				) : (
					<FormError error={data} />
				))}
		</div>
	);
};

export default AddAuthUserForm;
