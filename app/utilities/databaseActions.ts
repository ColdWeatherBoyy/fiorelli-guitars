"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserAndMessage = async (formData: FormData) => {
	try {
		let user;
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
			user = newUser;
		} else {
			userId = existingUser.id;
			user = existingUser;
		}
		const newMessage = await prisma.message.create({
			data: {
				content: formData.get("message") as string,
				userId: userId,
			},
		});
		return { newMessage, user };
	} catch (error) {
		// To-Do: Handle error more precisely
		console.error(error);
		return { error: "An error occurred. Please try again." };
	}
};

export const getUsers = async () => {
	const users = await prisma.user.findMany();
};
export const getMessages = async () => {
	const messages = await prisma.message.findMany();
};

export const getMessagesForUser = async (formData: FormData) => {
	const user = await prisma.user.findUnique({
		where: {
			email: formData.get("email") as string,
		},
	});
	if (!user) {
		console.log("no user");
		return;
	}
	const userMessages = await prisma.message.findMany({
		where: {
			userId: user.id,
		},
	});
};
