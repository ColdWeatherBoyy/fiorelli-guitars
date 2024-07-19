"use server";

import { AuthUser, Customer, Prisma, PrismaClient } from "@prisma/client";
import { CreateCustomerAndMessageResponse, newMessage } from "./types";
import { camelToTitleCase } from "./helpers";

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
		// console.error(error);
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
		return {
			name: "Customer not found.",
			message: "No customer was found with this email. Please try again.",
		};
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
		return {
			name: "Customer not found.",
			message: "No customer was found with this ID. Please try again.",
		};
	}
	return customerWithMessages;
};

export const getCustomerIdByEmailOrName = async (query: string) => {
	const customer = await prisma.customer.findFirst({
		where: { OR: [{ email: query }, { name: query }] },
	});
	if (!customer)
		return {
			name: "Customer not found.",
			message: "No customer was found with this search term. Please try again.",
		};
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
		// console.error(error);
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
			return {
				name: "Auth Error",
				message: "Failed to create authorized user. Please try again.",
			};
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

export const deleteAuthUser = async (id: string): Promise<AuthUser | Error> => {
	try {
		const deletedUser = await prisma.authUser.delete({
			where: {
				id: parseInt(id),
			},
		});
		if (!deletedUser) {
			return {
				name: "Auth Error",
				message: "Failed to delete authorized user. Please try again.",
			};
		}
		return deletedUser;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
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

export const getPageContent = async (title: string) => {
	try {
		const pageContent = await prisma.page.findUnique({
			where: {
				title,
			},
			include: {
				content: true,
			},
		});
		if (!pageContent) {
			throw new Error(`${title} page not found`);
		}

		return pageContent;
	} catch (error) {
		// console.error(error);
		throw new Error("An error occurred. Please try again.");
	}
};

export const updateContentBlock = async (id: number, key: string, value: string) => {
	try {
		if (key.includes("body")) {
			const contentBlock = await prisma.pageContent.findUnique({
				where: {
					id: id,
				},
				select: {
					bodies: true,
				},
			});
			if (!contentBlock) throw new Error("Error updating content.");
			const bodies = contentBlock.bodies;
			const bodiesIndex = parseInt(key.split(" ")[1]) - 1 || 0;
			bodies[bodiesIndex] = value;
			const updatedContentBlock = await prisma.pageContent.update({
				where: {
					id: id,
				},
				data: {
					bodies: bodies,
				},
			});
			return updatedContentBlock;
		}
		const updatedContentBlock = await prisma.pageContent.update({
			where: {
				id: id,
			},
			data: {
				[key]: value,
			},
		});
		return updatedContentBlock;
	} catch (error) {
		// console.error(error);
		throw new Error("An error occurred. Please try again.");
	}
};

export const getGuitarSpecs = async (tag: string) => {
	const guitarSpecs = await prisma.guitarSpec.findUnique({
		where: {
			tag,
		},
	});
	return guitarSpecs;
};

export const updateGuitarSpec = async (id: number, key: string, value: string) => {
	try {
		const updatedGuitarSpec = await prisma.guitarSpec.update({
			where: {
				id,
			},
			data: {
				[key]: value,
			},
		});
		return updatedGuitarSpec;
	} catch (error) {
		// console.error(error);
		return {
			name: "error",
			message: "An error occurred. Please try again.",
			cause: error?.toString() || "No error message provided.",
		};
	}
};

export const deleteGuitarSpec = async (id: number, key: string) => {
	try {
		const updatedGuitarSpec = await prisma.guitarSpec.update({
			where: {
				id,
			},
			data: {
				[key]: null,
			},
		});
		return updatedGuitarSpec;
	} catch (error) {
		// console.error(error);
		if (error instanceof Prisma.PrismaClientValidationError) {
			if (error.message.includes("must not be null.")) {
				return {
					name: "Required Value",
					message: `${camelToTitleCase(key)} is required and cannot be deleted.`,
					cause: "Prisma Client Validation Error",
				};
			}
		}
		return {
			name: "error",
			message: "An error occurred. Please try again.",
			cause: error?.toString() || "No error message provided.",
		};
	}
};
