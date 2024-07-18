"use client";

import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";

interface AddAuthUserFormProps {
	formAction: (paylod: FormData) => void;
	isMobile: boolean;
}

const AddAuthUserForm: FC<AddAuthUserFormProps> = ({ formAction, isMobile }) => {
	const [email, setEmail] = useState("");

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		formData.append("email", email);
		formAction(formData);
		setEmail("");
	};

	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			<form onSubmit={handleSubmit} className="flex gap-4">
				<input
					type="email"
					placeholder="Add new admin email..."
					required
					name="email"
					onChange={handleChange}
					value={email}
					className={`p-2 rounded-sm border border-slate-400 dark:border-slate-500 dark:placeholder-zinc-200 bg-zinc-50 dark:bg-zinc-600 shadow-inner-outer focus:shadow-md shadow-slate-400 dark:shadow-slate-900 focus:shadow-sm focus:shadow-slate-400 dark:focus:shadow-slate-900 focus:outline-0 focus:ring-1 focus:ring-cyan-400 dark:focus:ring-cyan-800 focus:ring-opacity-50 transition-all ease-in-out duration-200`}
				/>
				<AdminButtonLink text="Search" isMobile={isMobile} />
			</form>
		</div>
	);
};

export default AddAuthUserForm;
