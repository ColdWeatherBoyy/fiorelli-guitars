"use server";

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

export const sendEmail = async () => {
	const info = await transporter.sendMail({
		from: process.env.EMAIL,
		to: "johnjo@mailinator.com",
		subject: "Thanks for reaching out to Fiorelli!",
		text: `Hi there,\n\nThank you for reaching out to Fiorelli! We'll get back to you ASAP.\n\nBest,\nFiorelli Team`,
		html: `<p>Hi there,</p><p>Thank you for reaching out to Fiorelli! We'll get back to you ASAP.</p><p>Best,<br>Fiorelli Team</p>`,
	});

	return info;
};
