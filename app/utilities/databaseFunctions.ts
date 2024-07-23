"use server";

import { AuthUser, Customer, Message, Prisma, PrismaClient } from "@prisma/client";

import { camelToTitleCase } from "./helpers";

const prisma = new PrismaClient();

// Client Component // Event Handler
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
export const getCustomers = async () => {
	try {
		const customers = await prisma.customer.findMany({
			select: {
				email: true,
				name: true,
				messages: { select: { content: true } },
				id: true,
			},
		});

		if (!customers) {
			const error = new Error("Error retrieving customers. Please try again.");
			error.name = "Customer Retrieval Error";
			return error;
		}

		const flattenedCustomers = customers.map((customer) => {
			return {
				email: customer.email,
				name: customer.name,
				messages: customer.messages.length,
				id: customer.id,
			};
		});
		return flattenedCustomers;
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

// Going to Client Component (or in use within a Client component), so needs to return plain object.
// Event handler, so needs to return plain object
// To-DO evalaute findUniqueorThrow
export const getCustomerIdByEmailOrName = async (query: string) => {
	try {
		const customer = await prisma.customer.findFirst({
			where: { OR: [{ email: query }, { name: query }] },
		});
		if (!customer) {
			return {
				name: "Customer Not Found.",
				message: `No customer was found with this search term: ${query}. Please try again.`,
				cause: "Search term not found in database.",
			};
		}
		return customer.id;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			// findFirst doesn't have code 2025, if I try to add that in the future again
			return {
				name: "Prisma Known Request Error",
				message: `An error occurred when searching for ${query}. Please try again.`,
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
				message: "A database error occurred. Please try again.",
				cause: error.message,
			};
		} else {
			return {
				name: "Unknown Search Form Error",
				message: "An error occurred. Please try again.",
				cause: error?.toString() || "No error message provided.",
			};
		}
	}
};

// Goes to Server Component, so can return Error object
// Not an event handler, so can return Error object
export const getAuthUsers = async (): Promise<AuthUser[] | Error> => {
	try {
		const authUsers = await prisma.authUser.findMany({});

		if (authUsers.length === 0) {
			const error = new Error("No authorized users found.");
			error.name = "Auth Retrieval Error";
			return error;
		}

		return authUsers;
	} catch (error) {
		// console.error(error);
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

// Going to Client Component, so needs to return plain object.
// Event handler, so needs to return plain object
export const createAuthUser = async (email: string): Promise<AuthUser | Error> => {
	try {
		const authUser = await prisma.authUser.create({
			data: {
				email,
			},
		});

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
		const page = await prisma.page.findUniqueOrThrow({
			where: {
				title,
			},
		});

		const pageContent = await prisma.pageContent.findUniqueOrThrow({
			where: {
				pageId: page.id,
			},
		});

		return { page, pageContent };
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				const knownError = new Error(
					`Either no content or no page was found for ${title}. Please try again. ${error.code} - ${error.message}`
				);
				knownError.name = "Content Not Found";
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

// Event handler, so needs to return plain object
// Goes to Client Component, so needs to return plain object
export const updateContentBlock = async (id: number, key: string, value: string) => {
	try {
		if (key.includes("body")) {
			const contentBlock = await prisma.pageContent.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					bodies: true,
				},
			});
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
		} else {
			const updatedContentBlock = await prisma.pageContent.update({
				where: {
					id: id,
				},
				data: {
					[key]: value,
				},
			});

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

// Used in both event handler/Client Component, and Server Component.
// Built both options – Error Object and plain object – into the function.
export const getGuitarSpecs = async (tag: string, client: boolean = false) => {
	try {
		const guitarSpecs = await prisma.guitarSpec.findUniqueOrThrow({
			where: {
				tag,
			},
		});
		return guitarSpecs;
	} catch (error) {
		if (!client) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					const knownError = new Error(
						`No guitar specs were found for ${tag}. Please try again. ${error.code} - ${error.message}`
					);
					knownError.name = "Guitar Spec Retrieval Error";
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
				unknownError.name = "Guitar Spec Retrieval Error";
				return unknownError;
			}
		} else {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					return {
						name: "Guitar Spec Retrieval Error",
						message: `No guitar specs were found for ${tag}. Please try again.`,
						cause: `${error.code} - ${error.message}`,
					};
				} else {
					return {
						name: "Guitar Spec Retrieval Error",
						message: "An error occurred. Please try again.",
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
	}
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
