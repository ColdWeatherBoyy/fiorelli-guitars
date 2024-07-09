"use client";

import { toTitleCase } from "@/app/utilities/helpers";
import { FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface EditablePageContentProps {
	contentBlock: [string, string];
}

const EditablePageContent: FC<EditablePageContentProps> = ({ contentBlock }) => {
	return (
		<div className="flex flex-col gap-2 p-2 text-center">
			<div className="underline ">{toTitleCase(contentBlock[0])}</div>
			{/* To-Do: Fix the resizing that is off because of the sidebar */}
			<TextareaAutosize
				className="bg-slate-200 p-2 rounded-sm resize-none"
				maxRows={10}
				defaultValue={contentBlock[1]}
			/>
		</div>
	);
};

export default EditablePageContent;
