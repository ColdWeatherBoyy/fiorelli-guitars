"use server";

import { createCustomer } from "@/app/utilities/databaseFunctions/customer.db";
import { createMessage } from "@/app/utilities/databaseFunctions/message.db";
import { sendCustomerEmail, sendFiorelliEmail } from "@/app/utilities/resendFunctions";
import { isCustomer, isMessage } from "@/app/utilities/typeguardFunctions";

export const handleForm = async (
	prevState: boolean | Error,
	formData: FormData,
): Promise<boolean | Error> => {
	try {
		// Honeypot check - reject if hidden field is filled
		if (formData.get("website")) {
			return true; // Silently succeed to not alert bots
		}

		// reCAPTCHA verification
		const token = formData.get("recaptchaToken") as string;
		if (!token) {
			return true; // No token, likely a bot
		}

		const recaptchaScore = await verifyRecaptcha(token);
		if (recaptchaScore < 0.5) {
			return true; // Likely a bot (low score)
		}

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
	} catch {
		return {
			name: "Unexpected Error",
			message: "An unexpected error occurred in the Contact form. Please try again.",
			cause: "Internal error",
		};
	}
};

// Verify reCAPTCHA token with Google's API
async function verifyRecaptcha(token: string): Promise<number> {
	try {
		const params = new URLSearchParams();
		params.append("secret", process.env.RECAPTCHA_SECRET_KEY || "");
		params.append("response", token);

		const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: params.toString(),
		});

		const data = await response.json();
		if (!data.success) return 0;
		return data.score || 0;
	} catch {
		return 0; // Default to rejecting on error
	}
}
