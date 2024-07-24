"use server";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Used in both event handler/Client Component, and Server Component.
// Built both options – Error Object and plain object – into the function.
export const getBaseGuitarModel = async (tag: string, client: boolean = false) => {
	try {
		const guitarModel = await prisma.baseGuitarModel.findUniqueOrThrow({
			where: {
				tag,
			},
			include: {
				guitarSpec: true,
			},
		});
		return guitarModel;
	} catch (error) {
		if (!client) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					const knownError = new Error(
						`No base guitar model was found for ${tag}. Please try again. ${error.code} - ${error.message}`
					);
					knownError.name = "Base Guitar Model Retrieval Error";
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
				unknownError.name = "Base Guitar Model Retrieval Error";
				return unknownError;
			}
		} else {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					return {
						name: "Base Guitar Model Retrieval Error",
						message: `No base guitar models were found for ${tag}. Please try again.`,
						cause: `${error.code} - ${error.message}`,
					};
				} else {
					return {
						name: "Base Guitar Model Retrieval Error",
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

// Used in both event handler/Client Component, and Server Component.
// Built both options – Error Object and plain object – into the function.
export const getAllBaseGuitarModels = async () => {
	try {
		const guitarModels = await prisma.baseGuitarModel.findMany({
			include: {
				guitarSpec: true,
			},
		});
		return guitarModels;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const knownError = new Error(`${error.code} - ${error.message}`);
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
			unknownError.name = "Base Guitar Model Retrieval Error";
			return unknownError;
		}
	}
};

export const updateBaseGuitarSpec = async (id: number, key: string, content: string) => {
	try {
		const guitarSpecId = await prisma.baseGuitarModel.findUniqueOrThrow({
			where: {
				id,
			},
			select: {
				guitarSpecId: true,
			},
		});

		const updatedGuitarSpec = await prisma.guitarSpec.update({
			where: {
				id: guitarSpecId.guitarSpecId,
			},
			data: {
				[key]: content,
			},
		});
		return updatedGuitarSpec;
	} catch (error) {
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

export const deleteBaseGuitarSpec = async (id: number, key: string) => {
	try {
		const guitarSpecId = await prisma.baseGuitarModel.findUniqueOrThrow({
			where: {
				id,
			},
			select: {
				guitarSpecId: true,
			},
		});

		const deletedGuitarSpec = await prisma.guitarSpec.update({
			where: {
				id: guitarSpecId.guitarSpecId,
			},
			data: {
				[key]: null,
			},
		});
		return deletedGuitarSpec;
	} catch (error) {
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
