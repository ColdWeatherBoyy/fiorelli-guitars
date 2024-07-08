"use server";

import { AuthUser, Customer, Prisma, PrismaClient } from "@prisma/client";
import { CreateCustomerAndMessageResponse, newMessage } from "./types";

const prisma = new PrismaClient();

export const createCustomerAndMessage = async (
	formData: FormData
): Promise<CreateCustomerAndMessageResponse> => {
	try {
		const email = formData.get("email") as string;
		const name = formData.get("name") as string;
		const messageContent = formData.get("message") as string;

		if (!email) return { error: "Email is required." };
		if (!name) return { error: "Name is required." };
		if (!messageContent) return { error: "Message is required." };

		const customer: Customer = await prisma.customer.upsert({
			where: {
				email: formData.get("email") as string,
			},
			update: {},
			create: { email, name },
		});

		const newMessage: newMessage = await prisma.message.create({
			data: {
				content: messageContent,
				customerId: customer.id,
			},
		});
		return { newMessage, customer };
	} catch (error) {
		// To-Do: Handle error more precisely
		console.error(error);
		return { error: "An error occurred. Please try again." };
	}
};

export const getCustomers = async () => {
	const customers = await prisma.customer.findMany({
		select: {
			email: true,
			name: true,
			messages: { select: { content: true } },
			id: true,
		},
	});
	const flattenedCustomers = customers.map((customer) => {
		return {
			email: customer.email,
			name: customer.name,
			messages: customer.messages.length,
			id: customer.id,
		};
	});
	return flattenedCustomers;
};

export const getMessages = async () => {
	const messages = await prisma.message.findMany({
		select: {
			content: true,
			createdAt: true,
			customer: {
				select: {
					name: true,
					id: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	const flattenedMessages = messages.map((message) => {
		return {
			content: message.content,
			createdAt: message.createdAt,
			name: message.customer.name,
			id: message.customer.id,
		};
	});

	return flattenedMessages;
};

// For email response
export const getMessagesByCustomerEmail = async (email: string) => {
	const customerWithMessages = await prisma.customer.findUnique({
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

	if (!customerWithMessages) {
		throw new Error("Customer not found");
	}

	return customerWithMessages.messages;
};

// For admin page view, returns customers with messages
export const getMessagesByCustomerId = async (customerId: number) => {
	const customerWithMessages = await prisma.customer.findUnique({
		where: {
			id: customerId,
		},
		include: {
			messages: {
				orderBy: {
					createdAt: "desc",
				},
				select: {
					content: true,
					createdAt: true,
				},
			},
		},
	});

	if (!customerWithMessages) {
		throw new Error("Customer not found");
	}
	return customerWithMessages;
};

export const getCustomerIdByEmailOrName = async (query: string) => {
	const customer = await prisma.customer.findFirst({
		where: { OR: [{ email: query }, { name: query }] },
	});
	if (!customer) throw new Error("Customer not found");
	return customer.id;
};

export const getAuthUsers = async (): Promise<AuthUser[]> => {
	try {
		const authUsers = await prisma.authUser.findMany({});

		if (!authUsers) {
			throw new Error("Auth users not found");
		}

		return authUsers;
	} catch (error) {
		console.error(error);
		throw new Error("An error occurred. Please try again.");
	}
};

export const createAuthUser = async (email: string): Promise<AuthUser | Error> => {
	try {
		const authUser = await prisma.authUser.create({
			data: {
				email,
			},
		});

		if (!authUser) {
			throw new Error("Failed to create auth user");
		}
		return authUser;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return {
					name: "Unique Email Error",
					message: "This email is already authorized.",
					cause: `${error.code} - ${error.message}`,
				};
			}
			return {
				name: "Prisma Known Request Error",
				message: `A database occured. Please try again.`,
				cause: `${error.code} - ${error.message}`,
			};
		} else if (
			error instanceof Prisma.PrismaClientInitializationError ||
			error instanceof Prisma.PrismaClientValidationError ||
			error instanceof Prisma.PrismaClientRustPanicError ||
			error instanceof Prisma.PrismaClientUnknownRequestError
		) {
			return {
				name: "Prisma Database Error",
				message: `A database occured. Please try again.`,
				cause: error.message,
			};
		} else {
			return {
				name: "Error",
				message: `An unknown error occured. Please try again.`,
				cause: error?.toString() || "No error message provided.",
			};
		}
	}
};
