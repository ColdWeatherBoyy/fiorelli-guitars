"use client";

import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";
import { camelToTitleCase } from "@/app/utilities/helpers";
import { isGuitarSpec, isPageContent } from "@/app/utilities/typeguardFunctions";
import { NotificationContentType } from "@/app/utilities/types";
import { GuitarSpec, PageContent } from "@prisma/client";
import { FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import NotificationModal from "../notifications/NotificationModal";
import TextareaInput from "@/app/(admin)/components/components/TextareaInput";

interface EditableContentProps {
	contentObj: Record<string, string>;
	id: number;
	isMobile: boolean;
	updateContentFunction: (
		id: number,
		key: string,
		content: string
	) => Promise<GuitarSpec | PageContent | Error>;
	deleteContentFunction?: (
		id: number,
		key: string
	) => Promise<GuitarSpec | PageContent | Error>;
	onSuccess?: () => void;
}

const EditableContent: FC<EditableContentProps> = ({
	contentObj,
	id,
	isMobile,
	updateContentFunction,
	deleteContentFunction,
	onSuccess,
}) => {
	const [key, value] = Object.entries(contentObj)[0];
	const [content, setContent] = useState(value);
	const [open, setOpen] = useState(false);
	const [notificationContent, setNotificationContent] = useState<NotificationContentType>(
		{
			key: "string",
			content: "",
		}
	);
	const [success, setSuccess] = useState(false);

	const handleDeleteContent = async (id: number, key: string) => {
		if (!deleteContentFunction) return;
		setSuccess(false);
		const deleteError = new Error(
			"Failed to delete content. If problem persists, please contact site admin."
		);
		deleteError.name = "Can't Delete";

		try {
			const deletedContent = await deleteContentFunction(id, key);

			if (!deletedContent) {
				setNotificationContent({
					key: "error",
					content: deleteError,
				});
			} else if (!isGuitarSpec(deletedContent) && !isPageContent(deletedContent)) {
				setNotificationContent({
					key: "error",
					content: deletedContent,
				});
			} else {
				setSuccess(true);
				setNotificationContent({
					key: "string",
					content: `${key === "bodies" ? "Body" : camelToTitleCase(key)} deleted.`,
				});
			}
			setOpen(true);
		} catch (error) {
			setNotificationContent({
				key: "error",
				content: (error as Error) || deleteError,
			});
			setOpen(true);
			setSuccess(false);
		}
	};

	const handleUpdateContent = async (id: number, key: string, content: string) => {
		setSuccess(false);
		const updateError = new Error(
			"Failed to update content. If problem persists, please contact site admin."
		);
		updateError.name = "Can't Update";

		const noContentError = new Error("Content cannot be empty.");
		noContentError.name = "No Content";

		if (!content) {
			setNotificationContent({
				key: "error",
				content: noContentError,
			});
			setOpen(true);
			return;
		}

		try {
			const updatedContent = await updateContentFunction(id, key, content);

			if (!updatedContent) {
				setNotificationContent({
					key: "error",
					content: updateError,
				});
			} else if (!isGuitarSpec(updatedContent) && !isPageContent(updatedContent)) {
				setNotificationContent({
					key: "error",
					content: updatedContent,
				});
			} else {
				setSuccess(true);
				setNotificationContent({
					key: "string",
					content: `${key === "bodies" ? "Body" : camelToTitleCase(key)} updated.`,
				});
			}
			setOpen(true);
		} catch (error) {
			setNotificationContent({
				key: "error",
				content: (error as Error) || updateError,
			});
			setOpen(true);
			setSuccess(false);
		}
	};

	return (
		<div className="flex flex-col gap-2 p-2 text-center">
			<div className="underline">{camelToTitleCase(key)}</div>
			{/* To-Do: Fix the resizing that is off because of the sidebar */}
			<TextareaInput
				value={content}
				onChange={(event) => setContent(event.target.value)}
			/>
			<div
				className={`flex ${deleteContentFunction ? "justify-between" : "justify-center"}`}
			>
				<AdminButtonLink
					text="Save"
					handleClick={() => handleUpdateContent(id, key, content)}
					isMobile={isMobile}
				/>
				{deleteContentFunction ? (
					<AdminButtonLink
						text="Delete"
						handleClick={() => handleDeleteContent(id, key)}
						isMobile={isMobile}
					/>
				) : (
					<div></div>
				)}
			</div>

			{open && (
				<NotificationModal
					setOpen={setOpen}
					notificationContent={notificationContent}
					onSuccess={success ? onSuccess : undefined}
				/>
			)}
		</div>
	);
};

export default EditableContent;
