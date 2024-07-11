"use client";

import AdminButtonLink from "@/app/(admin)/components/AdminButtonLink";
import { updateContentBlock } from "@/app/utilities/databaseFunctions";
import { toTitleCase } from "@/app/utilities/helpers";
import { NotificationContentType } from "@/app/utilities/types";
import { FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import NotificationModal from "../components/NotificationModal";

interface EditablePageContentProps {
	contentBlock: Record<string, string>;
	pageId: number;
	isMobile: boolean;
}

const EditablePageContent: FC<EditablePageContentProps> = ({
	contentBlock,
	pageId,
	isMobile,
}) => {
	const [key, value] = Object.entries(contentBlock)[0];
	const [content, setContent] = useState(value);
	const [open, setOpen] = useState(false);
	const [notificationContent, setNotificationContent] = useState<NotificationContentType>(
		{
			key: "string",
			content: "",
		}
	);

	const handleUpdateContentBlock = async (
		pageId: number,
		key: string,
		content: string
	) => {
		const updateError = new Error(
			"Failed to update content block. If problem persists, please contact site admin."
		);
		updateError.name = "Update Error";
		try {
			const updatedContentBlock = await updateContentBlock(pageId, key, content);

			if (!updatedContentBlock) {
				setNotificationContent({
					key: "error",
					content: updateError,
				});
			} else {
				setNotificationContent({
					key: "string",
					content: `${key === "bodies" ? "Body" : toTitleCase(key)} updated.`,
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
			<div className="underline ">{toTitleCase(key)}</div>
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
					handleClick={() => handleUpdateContentBlock(pageId, key, content)}
					isMobile={isMobile}
				/>
			</div>
			{open && (
				<NotificationModal setOpen={setOpen} notificationContent={notificationContent} />
			)}
		</div>
	);
};

export default EditablePageContent;
