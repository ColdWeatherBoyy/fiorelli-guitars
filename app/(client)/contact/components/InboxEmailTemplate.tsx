/* eslint-disable @next/next/no-img-element */

import { getMessagesByCustomerEmail } from "@/app/utilities/databaseFunctions/message.db";
import { formatDateTime } from "@/app/utilities/helpers";
import { Customer, Message } from "@prisma/client";
import { FC } from "react";

interface InboxEmailTemplateProps {
	customer: Customer;
	message: Message;
}

export const InboxEmailTemplate: FC<Readonly<InboxEmailTemplateProps>> = async ({
	customer,
	message,
}) => {
	const customerMessages = await getMessagesByCustomerEmail(customer.email);

	return (
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
				<div style={{ textAlign: "center" }}>
					<img
						src="https://res.cloudinary.com/ds55z57ju/image/upload/v1719246574/Fiorelli_Logo_Email.png"
						alt="Fiorelli Guitars"
						style={{ width: "200px", marginBottom: "10px" }}
					/>
				</div>
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
						Hey Jamie,
					</div>
					<div
						style={{
							fontSize: "16px",
							lineHeight: "1.6",
							marginBottom: "10px",
							color: "white",
						}}
					>
						Here&apos;s your recent message from {customer.name} at {customer.email}. This
						is the message:
					</div>
					<div
						style={{
							padding: "10px",
							margin: "10px 20px",
							backgroundColor: "#0e7490",
							borderRadius: "5px",
							color: "#e4e4e7",
							fontStyle: "italic",
							fontSize: "16px",
						}}
					>
						{message.content}
					</div>
					{customerMessages instanceof Error ? (
						<div
							style={{
								fontSize: "16px",
								lineHeight: "1.6",
								marginBottom: "10px",
								color: "red",
							}}
						>
							<div>There was an error fetching previous messages from this customer.</div>
							<div>{customerMessages.name}</div>
							<div>{customerMessages.message}</div>
						</div>
					) : (
						customerMessages.length > 1 && (
							<>
								<div
									style={{
										fontSize: "16px",
										lineHeight: "1.6",
										marginBottom: "10px",
										color: "white",
									}}
								>
									If they&apos;ve reached out to you before, those messages will appear
									here:
								</div>
								{customerMessages?.map((message, index) => {
									if (index === 0) return null;
									return (
										<div
											key={message.id}
											style={{
												padding: "10px",
												margin: "10px 20px",
												backgroundColor: "#0e7490",
												borderRadius: "5px",
												color: "#e4e4e7",
												fontStyle: "italic",
												fontSize: "16px",
											}}
										>
											{message.content}{" "}
											<span
												style={{
													marginLeft: "10px",
													fontWeight: "bold",
													fontSize: "12px",
													fontStyle: "normal",
												}}
											>
												-{formatDateTime(message.createdAt)}
											</span>
										</div>
									);
								})}
							</>
						)
					)}
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
};
