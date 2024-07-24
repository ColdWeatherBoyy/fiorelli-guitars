"use server";

import { createCustomer } from "@/app/utilities/databaseFunctions/customer.db";
import { createMessage } from "@/app/utilities/databaseFunctions/message.db";
import { sendCustomerEmail, sendFiorelliEmail } from "@/app/utilities/resendFunctions";
import { isCustomer, isMessage } from "@/app/utilities/typeguardFunctions";

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
					"There was an error sending your email to Fiorelli. Please try again or email us directly.",
				cause: "Email service error.",
			};
		}
		if (success2 === false) {
			// console.error("Error sending Fiorelli inbox email");
		}

		return true;
	} catch (error) {
		return {
			name: "Unexpected Error",
			message: "An unexpected error occurred in the Contact form. Please try again.",
			cause: error,
		};
	}
};
