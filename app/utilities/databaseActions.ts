"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUserAndMessage(formData: FormData) {
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

export async function getUsers(formData: FormData) {
	const users = await prisma.user.findMany();
	console.log(users);
}
export async function getMessages(formData: FormData) {
	const messages = await prisma.message.findMany();
	console.log(messages);
}
