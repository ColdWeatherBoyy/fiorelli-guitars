"use client";

import { camelToTitleCase } from "@/app/utilities/helpers";
import { NotificationContentType } from "@/app/utilities/types";
import { FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import NotificationModal from "../notifications/NotificationModal";
import AdminButtonLink from "@/app/(admin)/components/components/AdminButtonLink";

interface EditableContentProps {
	contentObj: Record<string, string>;
	id: number;
	isMobile: boolean;
	updateContentFunction: (id: number, key: string, content: string) => Promise<any>;
	onSuccess?: () => void;
}

const EditableContent: FC<EditableContentProps> = ({
	contentObj,
	id,
	isMobile,
	updateContentFunction,
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

	const handleUpdateContent = async (id: number, key: string, content: string) => {
		const updateError = new Error(
			"Failed to update content. If problem persists, please contact site admin."
		);
		updateError.name = "Update Error";
		try {
			const updatedContent = await updateContentFunction(id, key, content);

			if (!updatedContent) {
				setNotificationContent({
					key: "error",
					content: updateError,
				});
			} else {
				if (onSuccess) onSuccess();
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
			<div className="self-end">
				<AdminButtonLink
					text="Save"
					handleClick={() => handleUpdateContent(id, key, content)}
					isMobile={isMobile}
				/>
			</div>
			{open && (
				<NotificationModal setOpen={setOpen} notificationContent={notificationContent} />
			)}
		</div>
	);
};

export default EditableContent;
