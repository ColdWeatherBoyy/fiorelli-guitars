import { ContactFormData } from "@/app/utilities/types";
import { FC } from "react";

interface CustomerEmailTemplateProps {
	ContactFormData: ContactFormData;
}

export const CustomerEmailTemplate: FC<Readonly<CustomerEmailTemplateProps>> = ({
	ContactFormData,
}) => (
	<div
		style={{
			background: "linear-gradient(#f4f4f5, #ecfeff)",
			color: "#FFFFFF",
			fontFamily: "Arial, sans-serif",
			margin: "0",
			padding: "20px",
			borderRadius: "5px",
		}}
	>
		<div
			style={{
				width: "100%",
				maxWidth: "600px",
			}}
		>
			<div style={{ padding: "20px 0", display: "flex", justifyContent: "center" }}>
				<img
					src="/fiorelli_logo.svg"
					alt="Fiorelli Guitars Logo"
					style={{ maxWidth: "200px" }}
				/>
			</div>
			<div
				style={{
					padding: "20px",
					backgroundColor: "#27272a",
					borderRadius: "5px",
				}}
			>
				<div style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "10px" }}>
					Hi {ContactFormData.user.name},
				</div>
				<div style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "10px" }}>
					Thank you for reaching out to Fiorelli! We'll get back to you ASAP. For your
					records, your message is included below:
				</div>
				<div
					style={{
						padding: "10px",
						margin: "10px 0",
						backgroundColor: "#0e7490",
						borderRadius: "5px",
						color: "#e4e4e7",
						fontStyle: "italic",
						fontSize: "14px",
					}}
				>
					{ContactFormData.newMessage.content}
				</div>
				<div style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "10px" }}>
					Best regards,
				</div>
				<p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "10px" }}>
					The Fiorelli Team
				</p>
			</div>
			<div
				style={{
					textAlign: "center",
					fontSize: "12px",
					color: "#999999",
					padding: "10px 0",
				}}
			>
				<p>© 2024 Fiorelli Guitars. All rights reserved.</p>
			</div>
		</div>
	</div>
);
