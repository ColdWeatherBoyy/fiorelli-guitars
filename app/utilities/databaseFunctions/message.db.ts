"use server";

import { Message, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Client Component // Event Handler
export const createMessage = async (
	formData: FormData,
	customerId: number
): Promise<Message | Error> => {
	try {
		const messageContent = formData.get("message") as string;
		if (!messageContent) {
			return {
				name: "Message Error",
				message: "Message is required.",
				cause: "No message submitted.",
			};
		}

		const newMessage = await prisma.message.create({
			data: {
				content: messageContent,
				customerId: customerId,
			},
		});

		if (!newMessage) {
			return {
				name: "Message Error",
				message: "Failed to create message. Please try again.",
				cause: "Message creation failed.",
			};
		}

		return newMessage;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				name: "Prisma Known Request Error",
				message: "A database error occured. Please try again.",
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
				message: "A database error occured. Please try again.",
				cause: error.message,
			};
		} else {
			return {
				name: "Unknown Error",
				message: "An unknown error occurred. Please try again.",
				cause: error?.toString() || "No error message provided.",
			};
		}
	}
};

// Goes to Server Component, so can return Error object
// Not an event handler, so can return Error object
export const getMessages = async () => {
	try {
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
		if (!messages) {
			const error = new Error("Error retrieving messages. Please try again.");
			error.name = "Message Retrieval Error";
			return error;
		}

		const flattenedMessages = messages.map((message) => {
			return {
				content: message.content,
				createdAt: message.createdAt,
				name: message.customer.name,
				id: message.customer.id,
			};
		});

		return flattenedMessages;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const knownError = new Error(
				`A database error occured. Please try again. ${error.code} - ${error.message}`
			);
			knownError.name = "Prisma Known Request Error";
			return knownError;
		} else if (
			error instanceof Prisma.PrismaClientInitializationError ||
			error instanceof Prisma.PrismaClientValidationError ||
			error instanceof Prisma.PrismaClientRustPanicError ||
			error instanceof Prisma.PrismaClientUnknownRequestError
		) {
			const prismaError = new Error(error.message);
			prismaError.name = "Prisma Database Error";
			return prismaError;
		} else {
			const unknownError = new Error(error?.toString() || "No error message provided.");
			unknownError.name = "Unknown Error";
			return unknownError;
		}
	}
};

// For email response
// Goes to Server Component, so can return Error object
// Not an event handler, so can return Error object
export const getMessagesByCustomerEmail = async (email: string) => {
	try {
		const customerWithMessages = await prisma.customer.findUniqueOrThrow({
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

		return customerWithMessages.messages;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				const knownError = new Error(
					`No user was found with email ${email}. Please try again. ${error.code} - ${error.message}`
				);
				knownError.name = "Customer Not Found";
				return knownError;
			}
			const knownError = new Error(
				`A database error occured. Please try again. ${error.code} - ${error.message}`
			);
			knownError.name = "Prisma Known Request Error";
			return knownError;
		} else if (
			error instanceof Prisma.PrismaClientInitializationError ||
			error instanceof Prisma.PrismaClientValidationError ||
			error instanceof Prisma.PrismaClientRustPanicError ||
			error instanceof Prisma.PrismaClientUnknownRequestError
		) {
			const prismaError = new Error(error.message);
			prismaError.name = "Prisma Database Error";
			return prismaError;
		} else {
			const unknownError = new Error(error?.toString() || "No error message provided.");
			unknownError.name = "Unknown Error";
			return unknownError;
		}
	}
};

// For admin page view, returns customers with messages
// Goes to Server Component, so can return Error object
// Not an event handler, so can return Error object
export const getMessagesByCustomerId = async (customerId: number) => {
	try {
		const customerWithMessages = await prisma.customer.findUniqueOrThrow({
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

		return customerWithMessages;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				const knownError = new Error(
					`No customer was found with ID: ${customerId}. Please try again. ${error.code} - ${error.message}`
				);
				knownError.name = "Customer Not Found";
				return knownError;
			} else {
				const knownError = new Error(`${error.code} - ${error.message}`);
				knownError.name = "Prisma Known Request Error";
				return knownError;
			}
		} else if (
			error instanceof Prisma.PrismaClientInitializationError ||
			error instanceof Prisma.PrismaClientValidationError ||
			error instanceof Prisma.PrismaClientRustPanicError ||
			error instanceof Prisma.PrismaClientUnknownRequestError
		) {
			const prismaError = new Error(error.message);
			prismaError.name = "Prisma Database Error";
			return prismaError;
		} else {
			const unknownError = new Error(error?.toString() || "No error message provided.");
			unknownError.name = "Page Content Retrieval Error";
			return unknownError;
		}
	}
};
