"use server";

import { AuthUser, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Goes to Server Component, so can return Error object
// Not an event handler, so can return Error object
export const getAuthUsers = async (): Promise<AuthUser[] | Error> => {
	try {
		const authUsers = await prisma.authUser.findMany({
			orderBy: {
				email: "asc",
			},
		});

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
