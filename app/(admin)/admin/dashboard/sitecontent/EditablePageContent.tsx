"use client";

import AdminButtonLink from "@/app/(admin)/components/AdminButtonLink";
import { toTitleCase } from "@/app/utilities/helpers";
import { FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface EditablePageContentProps {
	contentBlock: [string, string];
	isMobile: boolean;
}

const EditablePageContent: FC<EditablePageContentProps> = ({
	contentBlock,
	isMobile,
}) => {
	const [content, setContent] = useState(contentBlock[1]);

	return (
		<div className="flex flex-col gap-2 p-2 text-center">
			<div className="underline ">{toTitleCase(contentBlock[0])}</div>
			{/* To-Do: Fix the resizing that is off because of the sidebar */}
			<TextareaAutosize
				className={`resize-none p-2 rounded-sm border border-slate-400 dark:border-slate-500 dark:placeholder-zinc-200 bg-zinc-50 dark:bg-zinc-600 shadow-inner-outer focus:shadow-md shadow-slate-400 dark:shadow-slate-900 focus:shadow-sm focus:shadow-slate-400 dark:focus:shadow-slate-900 focus:outline-0 focus:ring-1 focus:ring-cyan-400 dark:focus:ring-cyan-800 focus:ring-opacity-50 transition-all ease-in-out duration-200`}
				maxRows={10}
				defaultValue={contentBlock[1]}
				onChange={(event) => setContent(event.target.value)}
			/>
			<div className="self-end">
				<AdminButtonLink
					text="Save"
					handleClick={() => {
						console.log(content);
					}}
					isMobile={isMobile}
				/>
			</div>
		</div>
	);
};

export default EditablePageContent;
