"use client";

import { useFormState } from "react-dom";
import CardButtonLink from "../../components/components/CardButtonLink";
import { handleForm } from "../utilities/handleForm";

const ContactForm = () => {
	const [data, formAction] = useFormState(handleForm, false);

	return (
		<>
			{!data ? (
				<form action={formAction} className="flex flex-col w-full">
					<label className="mb-2 font-semibold">Name:</label>
					<input
						type="text"
						required
						placeholder="Name"
						name="name"
						className={`mb-4 p-2 rounded-sm bg-zinc-100 dark:bg-zinc-700 shadow-inner shadow-zinc-400 dark:shadow-zinc-800 focus:shadow focus:shadow-zinc-500 dark:focus:shadow-zinc-900 focus:outline-0 focus:ring-1 focus:ring-cyan-500/50 dark:focus:ring-cyan-600/60 focus:ring-opacity-50`}
					/>
					<label className="mb-2 font-semibold">Email:</label>
					<input
						type="email"
						required
						placeholder="Email"
						name="email"
						className={`mb-4 p-2 rounded-sm bg-zinc-100 dark:bg-zinc-700 shadow-inner shadow-zinc-400 dark:shadow-zinc-800 focus:shadow focus:shadow-zinc-500 dark:focus:shadow-zinc-900 focus:outline-0 focus:ring-1 focus:ring-cyan-500/50 dark:focus:ring-cyan-600/60 focus:ring-opacity-50`}
					/>
					<label className="mb-2 font-semibold">Message:</label>
					<textarea
						placeholder="Message"
						required
						name="message"
						className={`mb-4 p-2 rounded-sm bg-zinc-100 dark:bg-zinc-700 shadow-inner shadow-zinc-400 dark:shadow-zinc-800 focus:shadow focus:shadow-zinc-400 dark:focus:shadow-zinc-900 focus:outline-0 focus:ring-1 focus:ring-cyan-500/50 dark:focus:ring-cyan-600/60 focus:ring-opacity-50 resize-none h-24`}
					></textarea>
					<CardButtonLink text="Submit" />
				</form>
			) : typeof data !== "boolean" ? (
				<div className="flex flex-col items-center text-center gap-2">
					<div className="text-xl text-red-500 font-semibold">{data.name}</div>
					<div className="text-lg text-red-500">{data.message}</div>
					<div className="text-red-700 text-sm">{data.cause as string}</div>
					<CardButtonLink text="Return Home" href="/" />
				</div>
			) : (
				<div className="flex flex-col items-center text-center gap-1">
					<p>Thank you for your message!</p>
					<p className="mb-2">We&apos;ll get back to you ASAP.</p>
					<CardButtonLink text="Return Home" href="/" />
				</div>
			)}
		</>
	);
};

export default ContactForm;
