"use server";

import { ContactFormData } from "./types";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
});

export const sendEmail = async (response: ContactFormData) => {
	const info = await transporter.sendMail({
		from: process.env.EMAIL,
		to: response.user.email,
		subject: "Thanks for reaching out to Fiorelli!",
		text: `Hi ${response.user.name},\n\nThank you for reaching out to Fiorelli! We'll get back to you ASAP.\n\nFor your records, your message is included below:\n\n${response.newMessage.content}\n\nBest,\nFiorelli Team`,
		html: `<p>Hi ${response.user.name},</p><p>Thank you for reaching out to Fiorelli! We'll get back to you ASAP.</p><p>For your records, your message is included below:</p><p>${response.newMessage.content}</p><p>Best,<br>Fiorelli Team</p>`,
	});

	return info;
};
