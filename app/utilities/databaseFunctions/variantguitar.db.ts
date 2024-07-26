"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { hasGuitarSpec, hasNoGuitarSpec } from "../typeguardFunctions";

const prisma = new PrismaClient();

export const getVariantGuitarModel = async (
	variantTag: string,
	client: boolean = false
) => {
	try {
		const guitarSpecs = await prisma.variantGuitarModel.findUniqueOrThrow({
			where: {
				variantTag,
			},
			include: {
				guitarSpec: true,
			},
		});
		return guitarSpecs;
	} catch (error) {
		if (!client) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					const knownError = new Error(
						`No variant guitar models were found for ${variantTag}. Please try again. ${error.code} - ${error.message}`
					);
					knownError.name = "Variant Guitar Model Retrieval Error";
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
				unknownError.name = "Variant Guitar Model Retrieval Error";
				return unknownError;
			}
		} else {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					return {
						name: "Variant Guitar Model Retrieval Error",
						message: `No variant guitar models were found for ${variantTag}. Please try again.`,
						cause: `${error.code} - ${error.message}`,
					};
				} else {
					return {
						name: "Variant Guitar Model Retrieval Error",
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

export const getAllVariantGuitarModels = async () => {
	try {
		const guitarModels = await prisma.variantGuitarModel.findMany({
			include: {
				guitarSpec: true,
			},
		});
		const guitarModelsWithSpecs = guitarModels.filter((model) => hasGuitarSpec(model));

		const guitarModelsWithoutSpecs = guitarModels.filter((model) =>
			hasNoGuitarSpec(model)
		);

		return { guitarModelsWithSpecs, guitarModelsWithoutSpecs };
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
			unknownError.name = "Variant Guitar Model Retrieval Error";
			return unknownError;
		}
	}
};

export const getAllGalleryVariantGuitarModels = async () => {
	try {
		const guitarModels = await prisma.variantGuitarModel.findMany({
			where: {
				gallery: true,
			},
			include: {
				guitarSpec: true,
			},
		});
		const guitarModelsWithSpecs = guitarModels.filter((model) => hasGuitarSpec(model));

		const guitarModelsWithoutSpecs = guitarModels.filter((model) =>
			hasNoGuitarSpec(model)
		);

		return { guitarModelsWithSpecs, guitarModelsWithoutSpecs };
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
			unknownError.name = "Variant Guitar Model Retrieval Error";
			return unknownError;
		}
	}
};

// export const updateVariantGuitarSpec = async (
// 	id: number,
// 	key: string,
// 	content: string
// ) => {
// 	try {
// 		const guitarSpecId = await prisma.variantGuitarModel.findUniqueOrThrow({
// 			where: {
// 				id,
// 			},
// 			select: {
// 				guitarSpecId: true,
// 			},
// 		});

// 		const updatedGuitarSpec = await prisma.guitarSpec.update({
// 			where: {
// 				id: guitarSpecId.guitarSpecId,
// 			},
// 			data: {
// 				[key]: content,
// 			},
// 		});
// 		return updatedGuitarSpec;
// 	} catch (error) {
// 		if (error instanceof Prisma.PrismaClientKnownRequestError) {
// 			return {
// 				name: "Validation Error",
// 				message: "An error occurred. Please try again.",
// 				cause: `${error.code} - ${error.message}`,
// 			};
// 		} else if (
// 			error instanceof Prisma.PrismaClientInitializationError ||
// 			error instanceof Prisma.PrismaClientValidationError ||
// 			error instanceof Prisma.PrismaClientRustPanicError ||
// 			error instanceof Prisma.PrismaClientUnknownRequestError
// 		) {
// 			return {
// 				name: "Prisma Database Error",
// 				message: "A database error occured. Please try again.",
// 				cause: error.message,
// 			};
// 		} else {
// 			return {
// 				name: "Unknown Error",
// 				message: "An unknown error occurred. Please try again.",
// 				cause: error?.toString() || "No error message provided.",
// 			};
// 		}
// 	}
// };
