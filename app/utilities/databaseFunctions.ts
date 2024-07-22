"use server";

import { AuthUser, Customer, Message, Prisma, PrismaClient } from "@prisma/client";

import { camelToTitleCase } from "./helpers";
import { newMessage } from "./types";

const prisma = new PrismaClient();

export const createCustomer = async (formData: FormData): Promise<Customer | Error> => {
	try {
		const email = formData.get("email") as string;
		if (!email)
			return {
				name: "Email Error",
				message: "Email is required.",
				cause: "No Email submitted.",
			};

		const name = formData.get("name") as string;

		if (!name)
			return {
				name: "Name Error",
				message: "Name is required.",
				cause: "No Name submitted.",
			};

		const newCustomer = await prisma.customer.upsert({
			where: {
				email: email,
			},
			update: {},
			create: { email, name },
		});
		if (!newCustomer) {
			return {
				name: "Customer Error",
				message: "Failed to create customer. Please try again.",
				cause: "Customer creation failed.",
			};
		}
		return newCustomer;
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

// export const createCustomerAndMessage = async (formData: FormData) => {
// 	try {
// 		const email = formData.get("email") as string;
// 		const name = formData.get("name") as string;
// 		const messageContent = formData.get("message") as string;

// 		if (!email) return { error: "Email is required." };
// 		if (!name) return { error: "Name is required." };
// 		if (!messageContent) return { error: "Message is required." };

// 		const customer: Customer = await prisma.customer.upsert({
// 			where: {
// 				email: formData.get("email") as string,
// 			},
// 			update: {},
// 			create: { email, name },
// 		});

// 		const newMessage: newMessage = await prisma.message.create({
// 			data: {
// 				content: messageContent,
// 				customerId: customer.id,
// 			},
// 		});
// 		return { newMessage, customer };
// 	} catch (error) {
// 		// To-Do: Handle error more precisely
// 		// console.error(error);
// 		return { error: "An error occurred. Please try again." };
// 	}
// };

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
	if (!customer) {
		const error = new Error(
			"No customer was found with this search term. Please try again."
		);
		error.name = "Customer not found.";
		return error;
	}
	return customer.id;
};

// Goes to Server Component, so can return Error object
// Not an event handler, so can return Error object
export const getAuthUsers = async (): Promise<AuthUser[] | Error> => {
	try {
		const authUsers = await prisma.authUser.findMany({});

		if (!authUsers) {
			const error = new Error("Auth users not found");
			error.name = "Auth Retrieval Error";
			return error;
		}

		return authUsers;
	} catch (error) {
		// console.error(error);
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const knownError = new Error("A database error occured. Please try again.");
			knownError.name = "Prisma Known Request Error";
			knownError.cause = `${error.code} - ${error.message}`;
			return knownError;
		} else if (
			error instanceof Prisma.PrismaClientInitializationError ||
			error instanceof Prisma.PrismaClientValidationError ||
			error instanceof Prisma.PrismaClientRustPanicError ||
			error instanceof Prisma.PrismaClientUnknownRequestError
		) {
			const prismaError = new Error("A database occured. Please try again.");
			prismaError.name = "Prisma Database Error";
			prismaError.cause = error.message;
			return prismaError;
		} else {
			const unknownError = new Error("An unknown error occurred. Please try again.");
			unknownError.name = "Unknown Error";
			unknownError.cause = error?.toString() || "No error message provided.";
			return unknownError;
		}
	}
};

// Going to Client Component, so needs to return plain object.
// Event handler, so needs to return plain object
export const createAuthUser = async (email: string): Promise<AuthUser | Error> => {
	try {
		const authUser = await prisma.authUser.create({
			data: {
				email,
			},
		});
		if (!authUser) {
			const error = {
				name: "Auth Error",
				message: "Failed to create authorized user. Please try again.",
			};
			return error;
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
			} else {
				return {
					name: "Prisma Known Request Error",
					message: "A database error occured. Please try again.",
					cause: `${error.code} - ${error.message}`,
				};
			}
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

// Going to Client Component, so needs to return plain object.
// Event handler, so needs to return plain object
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

// Go to server component, so can return Error object
// Not an event handler, so can return Error object
export const getPageContent = async (title: string) => {
	try {
		const page = await prisma.page.findUnique({
			where: {
				title,
			},
		});
		if (!page) {
			const error = new Error(`${title} page not found.`);
			error.name = "Page Retrieval Error";
			return error;
		}

		const pageContent = await prisma.pageContent.findUnique({
			where: {
				pageId: page.id,
			},
		});

		if (!pageContent) {
			const error = new Error(`${title} page content not found.`);
			error.name = "Content Retrieval Error";
			return error;
		}

		return { page, pageContent };
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				const knownError = new Error(
					`Either no content or no page was found for ${title}. Please try again.`
				);
				knownError.name = "Content Not Found";
				knownError.cause = `${error.code} - ${error.message}`;
				return knownError;
			} else {
				const knownError = new Error("A database occured. Please try again.");
				knownError.name = "Prisma Known Request Error";
				knownError.cause = `${error.code} - ${error.message}`;
				return knownError;
			}
		} else if (
			error instanceof Prisma.PrismaClientInitializationError ||
			error instanceof Prisma.PrismaClientValidationError ||
			error instanceof Prisma.PrismaClientRustPanicError ||
			error instanceof Prisma.PrismaClientUnknownRequestError
		) {
			const prismaError = new Error("A database occured. Please try again.");
			prismaError.name = "Prisma Database Error";
			prismaError.cause = error.message;
			return prismaError;
		} else {
			const unknownError = new Error("An unknown error occurred. Please try again.");
			unknownError.name = "Page Content Retrieval Error";
			unknownError.cause = error?.toString() || "No error message provided.";
			return unknownError;
		}
	}
};

// Event handler, so needs to return plain object
// Goes to Client Component, so needs to return plain object
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
			if (!contentBlock) {
				return {
					name: "Content Block Retrieval Error",
					message: "Content block not found.",
					cause: "Finding content by ID for body update failed.",
				};
			}
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

			if (!updatedContentBlock) {
				return {
					name: "Content Block Update Error",
					message: "Failed to update content block. Please try again.",
					cause: "Body content block update failed.",
				};
			}
			return updatedContentBlock;
		} else {
			const updatedContentBlock = await prisma.pageContent.update({
				where: {
					id: id,
				},
				data: {
					[key]: value,
				},
			});

			if (!updatedContentBlock) {
				return {
					name: "Content Block Update Error",
					message: "Failed to update content block. Please try again.",
					cause: "Non-body content block update failed.",
				};
			}

			return updatedContentBlock;
		}
	} catch (error) {
		// console.error(error);
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				name: "Validation Error",
				message: "A validation error occurred. Please try again.",
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

// Not an event handler, so can return Error object
// Goes to Server Component, so can return Error object
export const getGuitarSpecs = async (tag: string) => {
	const guitarSpecs = await prisma.guitarSpec.findUnique({
		where: {
			tag,
		},
	});
	return guitarSpecs;
};

// Event handler, so needs to return plain object
// Goes to Client Component, so needs to return plain object
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

		if (!updatedGuitarSpec) {
			return {
				name: "Guitar Spec Update Error",
				message: "Failed to update guitar spec. Please try again.",
				cause: "Guitar spec update failed.",
			};
		}

		return updatedGuitarSpec;
	} catch (error) {
		// console.error(error)
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				name: "Validation Error",
				message: "An error occurred. Please try again.",
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

// Event handler, so needs to return plain object
// Goes to Client Component, so needs to return plain object
export const deleteGuitarSpec = async (id: number, key: string) => {
	try {
		const deletedGuitarSpec = await prisma.guitarSpec.update({
			where: {
				id,
			},
			data: {
				[key]: null,
			},
		});
		if (!deletedGuitarSpec) {
			return {
				name: "Guitar Spec Delete Error",
				message: "Failed to delete guitar spec. Please try again.",
				cause: "Guitar spec delete failed.",
			};
		}
		return deletedGuitarSpec;
	} catch (error) {
		// console.error(error);
		if (error instanceof Prisma.PrismaClientValidationError) {
			if (error.message.includes("must not be null.")) {
				return {
					name: "Validation Error",
					message: `${camelToTitleCase(key)} is required and cannot be deleted.`,
					cause: "Prisma Client Validation Error",
				};
			} else {
				return {
					name: "Validation Error",
					message: "An error occurred. Please try again.",
					cause: "Prisma Client Validation Error",
				};
			}
		} else if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				name: "Known Request Error",
				message: "An error occurred. Please try again.",
				cause: `${error.code} - ${error.message}`,
			};
		} else if (
			error instanceof Prisma.PrismaClientInitializationError ||
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
				cause: error?.toString() || "No error message provided",
			};
		}
	}
};
