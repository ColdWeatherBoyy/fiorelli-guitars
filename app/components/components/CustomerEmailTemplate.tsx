import { ContactFormData } from "@/app/utilities/types";
import { FC } from "react";

interface CustomerEmailTemplateProps {
	ContactFormData: ContactFormData;
}

export const CustomerEmailTemplate: FC<Readonly<CustomerEmailTemplateProps>> = ({
	ContactFormData,
}) => (
	<div style={{ fontFamily: "sans-serif", color: "#111827", padding: "2rem" }}>
		<h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
			Hi {ContactFormData.user.name},
		</h1>

		<p style={{ fontSize: "1.2rem" }}>
			Thank you for reaching out to Fiorelli! We'll get back to you ASAP.
		</p>

		<p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
			For your records, your message is included below:
		</p>

		<p style={{ fontSize: "1rem", fontStyle: "italic", color: "#6b7280" }}>
			{ContactFormData.newMessage.content}
		</p>

		<p style={{ fontSize: "1.2rem" }}>
			Best regards,
			<br />
			The Fiorelli Team
		</p>
	</div>
);
