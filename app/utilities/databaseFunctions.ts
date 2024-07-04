"use server";

import { PrismaClient, Customer } from "@prisma/client";
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

export const getAuthUserEmails = async () => {
	const authUsers = await prisma.authUserEmails.findMany({
		select: {
			email: true,
		},
	});
	const authUserEmails = authUsers.map((authUser) => authUser.email);

	return authUserEmails;
};

// export const getAuthUser = async (email: string): Promise<AuthUser | undefined> => {
// 	try {
// 		const authUser = await prisma.authUser.findUnique({
// 			where: {
// 				email,
// 			},
// 		});

// 		if (!authUser) {
// 			return undefined;
// 		}

// 		return authUser;
// 	} catch (error) {
// 		console.error(error);
// 		throw new Error("An error occurred. Please try again.");
// 	}
// };

// export const createAuthUser = async (
// 	email: string,
// 	password: string
// ): Promise<AuthUser> => {
// 	try {
// 		const hashedPassword = await bcrypt.hash(password, 10);

// 		const authUser = await prisma.authUser.create({
// 			data: {
// 				email,
// 				password: hashedPassword,
// 			},
// 		});

// 		return authUser;
// 	} catch (error) {
// 		console.error(error);
// 		throw new Error("An error occurred. Please try again.");
// 	}
// };
