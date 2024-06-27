"use server";

import { PrismaClient, User } from "@prisma/client";
import { CreateUserAndMessageResponse, newMessage } from "./types";

const prisma = new PrismaClient();

export const createUserAndMessage = async (
	formData: FormData
): Promise<CreateUserAndMessageResponse> => {
	try {
		const email = formData.get("email") as string;
		const name = formData.get("name") as string;
		const messageContent = formData.get("message") as string;

		if (!email) return { error: "Email is required." };
		if (!name) return { error: "Name is required." };
		if (!messageContent) return { error: "Message is required." };

		const user: User = await prisma.user.upsert({
			where: {
				email: formData.get("email") as string,
			},
			update: {},
			create: { email, name },
		});

		const newMessage: newMessage = await prisma.message.create({
			data: {
				content: messageContent,
				userId: user.id,
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
	return users;
};

export const getMessages = async () => {
	const messages = await prisma.message.findMany({
		select: {
			id: true,
			content: true,
			createdAt: true,
			user: {
				select: {
					id: true,
					email: true,
					name: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	const flattenedMessages = messages.map((message) => {
		return {
			id: message.id,
			content: message.content,
			createdAt: message.createdAt,
			email: message.user.email,
			name: message.user.name,
		};
	});

	return flattenedMessages;
};

export const getMessagesForUser = async (email: string) => {
	const userWithMessages = await prisma.user.findUnique({
		where: {
			email,
		},
		include: {
			messages: {
				orderBy: {
					createdAt: "desc",
				},
			},
		},
	});

	if (!userWithMessages) {
		throw new Error("User not found");
	}

	return userWithMessages.messages;
};
