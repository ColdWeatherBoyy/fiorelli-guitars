"use server";

import { ReactElement } from "react";
import { Resend } from "resend";
import { CustomerEmailTemplate } from "../components/components/CustomerEmailTemplate";
import { ContactFormData } from "./types";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (contactFormData: ContactFormData) => {
	const resend = new Resend(process.env.RESEND_API_KEY);

	try {
		const { data, error } = await resend.emails.send({
			from: "Mr. Fiorelli <no-reply@fiorelli-emails.eliassz.com>",
			to: [contactFormData.user.email],
			subject: "Thanks for reaching out to Fiorelli!",
			react: CustomerEmailTemplate({
				contactFormData,
			}) as ReactElement,
		});

		if (error) {
			console.error("failed send", error);
			return false;
		}

		return data;
	} catch (error) {
		console.error("catch error", error);
		return false;
	}
};
