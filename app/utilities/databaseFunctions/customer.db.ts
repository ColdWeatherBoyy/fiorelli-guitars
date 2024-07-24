"use server";

import { Customer, Prisma, PrismaClient } from "@prisma/client";

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
