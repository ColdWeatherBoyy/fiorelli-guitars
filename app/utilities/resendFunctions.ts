"use server";

import { Customer, Message } from "@prisma/client";
import { ReactElement } from "react";
import { Resend } from "resend";
import { CustomerEmailTemplate } from "../(client)/contact/components/CustomerEmailTemplate";
import { InboxEmailTemplate } from "../(client)/contact/components/InboxEmailTemplate";

export const sendCustomerEmail = async (customer: Customer, message: Message) => {
	const resend = new Resend(process.env.RESEND_API_KEY);

	try {
		const { data, error } = await resend.emails.send({
			from: "Fiorelli Guitars <no-reply@fiorelliguitars.com>",
			to: [customer.email],
			subject: "Thanks for reaching out to Fiorelli!",
			react: CustomerEmailTemplate({
				customer,
				message,
			}) as ReactElement,
		});

		if (error) {
			// console.error("failed send customer", error);
			return false;
		}

		return data;
	} catch (error) {
		// console.error("catch error customer", error);
		return false;
	}
};

export const sendFiorelliEmail = async (customer: Customer, message: Message) => {
	const resend = new Resend(process.env.RESEND_API_KEY);
	const email = process.env.INBOX_EMAIL;
	if (!email) {
		// console.error("Set an inbox email!");
		return false;
	}

	try {
		const { data, error } = await resend.emails.send({
			from: "Fiorelli Guitars <no-reply@fiorelliguitars.com>",
			to: [email],
			subject: `New Message from ${customer.name}`,
			react: InboxEmailTemplate({
				customer,
				message,
			}) as ReactElement,
		});

		if (error) {
			// console.error("failed send inbox", error);
			return false;
		}

		return data;
	} catch (error) {
		// console.error("catch error inbox", error);
		return false;
	}
};
