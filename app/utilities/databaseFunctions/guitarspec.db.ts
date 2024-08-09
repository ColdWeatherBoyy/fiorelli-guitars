"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { camelToTitleCase } from "../helpers";

const prisma = new PrismaClient();

export const getVariantGuitarModelSpec = async (
	variantTag: string,
	client: boolean = false
) => {
	try {
		const guitarSpecs = await prisma.variantGuitarModel.findUniqueOrThrow({
			where: {
				variantTag,
			},
			select: {
				name: true,
				colorScheme: true,
				guitarSpec: true,
				distinction: true,
			},
		});
		return guitarSpecs;
	} catch (error) {
		if (!client) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					const knownError = new Error(
						`No variant guitar specs were found for ${variantTag}. Please try again. ${error.code} - ${error.message}`
					);
					knownError.name = "Variant Guitar Spec Retrieval Error";
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
				unknownError.name = "Variant Guitar Spec Retrieval Error";
				return unknownError;
			}
		} else {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					return {
						name: "Variant Guitar Spec Retrieval Error",
						message: `No variant guitar specs were found for ${variantTag}. Please try again.`,
						cause: `${error.code} - ${error.message}`,
					};
				} else {
					return {
						name: "Variant Guitar Spec Retrieval Error",
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

export const getBaseGuitarModelSpec = async (tag: string, client: boolean = false) => {
	try {
		const guitarSpec = await prisma.baseGuitarModel.findUniqueOrThrow({
			where: {
				tag,
			},
			select: {
				name: true,
				guitarSpec: true,
			},
		});
		return guitarSpec;
	} catch (error) {
		if (!client) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					const knownError = new Error(
						`No specs were found for ${tag}. Please try again. ${error.code} - ${error.message}`
					);
					knownError.name = "Base Guitar Spec Retrieval Error";
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
				unknownError.name = "Base Guitar Spec Retrieval Error";
				return unknownError;
			}
		} else {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					return {
						name: "Base Guitar Spec Retrieval Error",
						message: `No guitar specs were found for ${tag}. Please try again.`,
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

export const getGuitarSpec = async (id: number) => {
	try {
		const guitarSpec = await prisma.guitarSpec.findUniqueOrThrow({
			where: {
				id,
			},
		});
		return guitarSpec;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				name: "Prisma Client Known Request Error",
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
export const updateGuitarModelSpec = async (id: number, key: string, value: string) => {
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
export const deleteGuitarModelSpec = async (id: number, key: string) => {
	try {
		const deletedGuitarSpec = await prisma.guitarSpec.update({
			where: {
				id,
			},
			data: {
				[key]: null,
			},
		});

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
