"use server";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
