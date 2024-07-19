"use server";

import { createCustomerAndMessage } from "@/app/utilities/databaseFunctions";
import { sendCustomerEmail, sendFiorelliEmail } from "@/app/utilities/resendFunctions";
import { isContactFormData } from "@/app/utilities/typeguardFunctions";

export const handleForm = async (prevState: boolean, formData: FormData) => {
	try {
		const contactFormData = await createCustomerAndMessage(formData);
		if (isContactFormData(contactFormData) === false) {
			// console.error(contactFormData.error);
			return false;
		}
		const success = await sendCustomerEmail(contactFormData);
		const success2 = await sendFiorelliEmail(contactFormData);

		if (success === false) {
			// console.error("Error sending email");
			return false;
		}
		if (success2 === false) {
			// console.error("Error sending Fiorelli inbox email");
		}

		return true;
	} catch (error) {
		// console.error(error);
		return false;
	}
};
