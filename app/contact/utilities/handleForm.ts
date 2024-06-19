"use server";

import { createUserAndMessage } from "../../utilities/databaseFunctions";
import { sendCustomerEmail } from "../../utilities/resendFunctions";
import { isContactFormData } from "../../utilities/typeguardFunctions";

export const handleForm = async (prevState: boolean, formData: FormData) => {
	try {
		const contactFormData = await createUserAndMessage(formData);
		if (isContactFormData(contactFormData) === false) {
			console.error(contactFormData.error);
			return false;
		}
		// console.log(contactFormData);
		const success = await sendCustomerEmail(contactFormData);
		// console.log(success);

		if (success === false) {
			console.error("Error sending email");
			return false;
		}

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
