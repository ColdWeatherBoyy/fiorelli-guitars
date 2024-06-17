"use client";

import { TextSize } from "@/app/utilities/types";
import React, { ChangeEvent, FormEvent } from "react";
import CardButtonLink from "./CardButtonLink";

const ContactForm = () => {
	const [userData, setUserData] = React.useState({
		name: "",
		email: "",
		message: "",
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setUserData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!userData.name || !userData.email || !userData.message) {
			alert("Please fill all the fields");
			return;
		}
		console.log("Form submitted:", userData);
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col w-full">
			<label className="mb-2 font-semibold">Name:</label>
			<input
				type="text"
				placeholder="Name"
				name="name"
				value={userData.name}
				onChange={handleChange}
				className="mb-4 p-2 rounded-sm bg-zinc-100 dark:bg-zinc-700 shadow-inner shadow-zinc-400 dark:shadow-zinc-800 focus:shadow focus:shadow-zinc-500 dark:focus:shadow-zinc-900 focus:outline-0 focus:ring-1 focus:ring-cyan-500/50 dark:focus:ring-cyan-700/50 focus:ring-opacity-50"
			/>
			<label className="mb-2 font-semibold">Email:</label>
			<input
				type="email"
				placeholder="Email"
				name="email"
				value={userData.email}
				onChange={handleChange}
				className="mb-4 p-2 rounded-sm bg-zinc-100 dark:bg-zinc-700 shadow-inner shadow-zinc-400 dark:shadow-zinc-800 focus:shadow focus:shadow-zinc-500 dark:focus:shadow-zinc-900 focus:outline-0 focus:ring-1 focus:ring-cyan-500/50 dark:focus:ring-cyan-700/50 focus:ring-opacity-50"
			/>
			<label className="mb-2 font-semibold">What are you looking for?</label>
			<textarea
				placeholder="Message"
				name="message"
				value={userData.message}
				onChange={handleChange}
				className="mb-4 p-2 rounded-sm bg-zinc-100 dark:bg-zinc-700 shadow-inner shadow-zinc-400 dark:shadow-zinc-800 focus:shadow focus:shadow-zinc-400 dark:focus:shadow-zinc-900 focus:outline-0 focus:ring-1 focus:ring-cyan-500/50 dark:focus:ring-cyan-700/50 focus:ring-opacity-50 resize-none h-24"
			></textarea>
			<div className="self-center">
				<CardButtonLink text="Submit" size={TextSize.small} />
			</div>
		</form>
	);
};

export default ContactForm;
