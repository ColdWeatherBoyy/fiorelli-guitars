"use server";

import { createUserAndMessage } from "./databaseActions";
import { sendEmail } from "./mailActions";
import { isContactFormData } from "./typeguardFunctions";

export const handleForm = async (prevState: boolean, formData: FormData) => {
	try {
		const contactFormData = await createUserAndMessage(formData);
		if (isContactFormData(contactFormData) === false) {
			console.error(contactFormData.error);
			return false;
		}

		const success = await sendEmail(contactFormData);

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
