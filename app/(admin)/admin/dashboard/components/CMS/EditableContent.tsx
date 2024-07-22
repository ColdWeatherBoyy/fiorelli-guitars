"use client";

import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";
import { camelToTitleCase } from "@/app/utilities/helpers";
import { isGuitarSpec } from "@/app/utilities/typeguardFunctions";
import { NotificationContentType } from "@/app/utilities/types";
import { FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import NotificationModal from "../notifications/NotificationModal";

interface EditableContentProps {
	contentObj: Record<string, string>;
	id: number;
	isMobile: boolean;
	updateContentFunction: (id: number, key: string, content: string) => Promise<any>;
	deleteContentFunction?: (id: number, key: string) => Promise<any>;
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
			} else if (!isGuitarSpec(deletedContent)) {
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
			<TextareaAutosize
				className={`resize-none p-2 rounded-sm border border-slate-400 dark:border-slate-500 dark:placeholder-zinc-200 bg-zinc-50 dark:bg-zinc-600 shadow-inner-outer focus:shadow-md shadow-slate-400 dark:shadow-slate-900 focus:shadow-sm focus:shadow-slate-400 dark:focus:shadow-slate-900 focus:outline-0 focus:ring-1 focus:ring-cyan-400 dark:focus:ring-cyan-800 focus:ring-opacity-50 transition-all ease-in-out duration-200`}
				maxRows={10}
				defaultValue={content}
				onChange={(event) => setContent(event.target.value)}
			/>
			<div className="flex justify-between">
				{deleteContentFunction ? (
					<AdminButtonLink
						text="Delete"
						handleClick={() => handleDeleteContent(id, key)}
						isMobile={isMobile}
					/>
				) : (
					<div></div>
				)}
				<AdminButtonLink
					text="Save"
					handleClick={() => handleUpdateContent(id, key, content)}
					isMobile={isMobile}
				/>
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
