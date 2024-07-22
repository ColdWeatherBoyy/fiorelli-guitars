"use server";

import { createCustomer, createMessage } from "@/app/utilities/databaseFunctions";
import { sendCustomerEmail, sendFiorelliEmail } from "@/app/utilities/resendFunctions";
import { isCustomer, isMessage } from "@/app/utilities/typeguardFunctions";
import { Prisma } from "@prisma/client";

export const handleForm = async (
	prevState: boolean | Error,
	formData: FormData
): Promise<boolean | Error> => {
	try {
		const newCustomer = await createCustomer(formData);
		if (!isCustomer(newCustomer)) {
			return {
				name: newCustomer.name,
				message: newCustomer.message,
				cause: String(newCustomer.cause) || "",
			};
		}

		const newMessage = await createMessage(formData, newCustomer.id);
		if (!isMessage(newMessage)) {
			return {
				name: newMessage.name,
				message: newMessage.message,
				cause: String(newMessage.cause) || "",
			};
		}

		const success = await sendCustomerEmail(newCustomer, newMessage);
		const success2 = await sendFiorelliEmail(newCustomer, newMessage);

		if (success === false) {
			return {
				name: "Email Error",
				message:
					"There was an error sending the email. Pleaes try again or email us directly.",
				cause: "Email service error.",
			};
		}
		if (success2 === false) {
			// console.error("Error sending Fiorelli inbox email");
		}

		return true;
	} catch (error) {
		// console.error(error);
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				name: error.name,
				message: error.message,
				cause: error.code,
			};
		} else if (
			error instanceof Prisma.PrismaClientInitializationError ||
			error instanceof Prisma.PrismaClientValidationError ||
			error instanceof Prisma.PrismaClientRustPanicError ||
			error instanceof Prisma.PrismaClientUnknownRequestError
		) {
			return {
				name: error.name,
				message: error.message,
				cause: "Prisma Error",
			};
		} else {
			return {
				name: "Unknown Error",
				message: "An unknown error occurred. Please try again or contact the site admin.",
				cause: "Unknown",
			};
		}
	}
};
