import { TextSize } from "@/app/utilities/types";
import CardButtonLink from "../components/components/CardButtonLink";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createContact(formData: FormData) {
	"use server";

	let userId;
	const existingUser = await prisma.user.findUnique({
		where: {
			email: formData.get("email") as string,
		},
	});
	if (!existingUser) {
		const newUser = await prisma.user.create({
			data: {
				name: formData.get("name") as string,
				email: formData.get("email") as string,
			},
		});
		userId = newUser.id;
	} else {
		userId = existingUser.id;
	}
	const newMessage = await prisma.message.create({
		data: {
			content: formData.get("message") as string,
			userId: userId,
		},
	});
}

const ContactForm = () => {
	return (
		<form action={createContact} className="flex flex-col w-full">
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
			<label className="mb-2 font-semibold">What are you looking for?</label>
			<textarea
				placeholder="Message"
				required
				name="message"
				className={`mb-4 p-2 rounded-sm bg-zinc-100 dark:bg-zinc-700 shadow-inner shadow-zinc-400 dark:shadow-zinc-800 focus:shadow focus:shadow-zinc-400 dark:focus:shadow-zinc-900 focus:outline-0 focus:ring-1 focus:ring-cyan-500/50 dark:focus:ring-cyan-600/60 focus:ring-opacity-50 resize-none h-24`}
			></textarea>
			<CardButtonLink text="Submit" size={TextSize.small} />
		</form>
	);
};

export default ContactForm;
