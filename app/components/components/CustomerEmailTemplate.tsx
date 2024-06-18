import { ContactFormData } from "@/app/utilities/types";
import { FC } from "react";

interface CustomerEmailTemplateProps {
	contactFormData: ContactFormData;
}

export const CustomerEmailTemplate: FC<Readonly<CustomerEmailTemplateProps>> = ({
	contactFormData,
}) => (
	<div
		style={{
			backgroundColor: "#d4d4d8",
			color: "#FFFFFF",
			fontFamily: "Arial, sans-serif",
			padding: "20px",
			borderRadius: "5px",
			margin: "0 auto",
		}}
	>
		<div
			style={{
				width: "100%",
				maxWidth: "600px",
				margin: "0 auto",
			}}
		>
			<div
				style={{
					padding: "20px",
					backgroundColor: "#27272a",
					borderRadius: "5px",
				}}
			>
				<div
					style={{
						fontSize: "16px",
						lineHeight: "1.6",
						marginBottom: "10px",
						color: "white",
					}}
				>
					Hi {contactFormData.user.name},
				</div>
				<div
					style={{
						fontSize: "16px",
						lineHeight: "1.6",
						marginBottom: "10px",
						color: "white",
					}}
				>
					Thank you for reaching out to Fiorelli! We'll get back to you ASAP. For your
					records, your message is included below:
				</div>
				<div
					style={{
						padding: "10px",
						margin: "10px 20px",
						backgroundColor: "#0e7490",
						borderRadius: "5px",
						color: "#e4e4e7",
						fontStyle: "italic",
						fontSize: "14px",
					}}
				>
					{contactFormData.newMessage.content}
				</div>
				<div
					style={{
						fontSize: "16px",
						lineHeight: "1.6",
						marginBottom: "10px",
						color: "white",
					}}
				>
					Best regards,
				</div>
				<p
					style={{
						fontSize: "16px",
						lineHeight: "1.6",
						marginBottom: "10px",
						color: "white",
					}}
				>
					The Fiorelli Team
				</p>
			</div>
			<div
				style={{
					textAlign: "center",
					fontSize: "12px",
					color: "#083344",
					padding: "10px 0",
				}}
			>
				<p>© 2024 Fiorelli Guitars. All rights reserved.</p>
			</div>
		</div>
	</div>
);
