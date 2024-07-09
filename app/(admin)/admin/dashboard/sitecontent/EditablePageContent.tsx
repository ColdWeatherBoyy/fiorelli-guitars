"use client";

import { FC, useState } from "react";

interface EditablePageContentProps {
	contentBlocks: [string, string][];
}

const EditablePageContent: FC<EditablePageContentProps> = ({ contentBlocks }) => {
	const [textareaValue, setTextareaValue] = useState<string>("");

	return (
		<div className="grid grid-cols-2 gap-8">
			{contentBlocks.map(([key, value]) => {
				return (
					<div key={key} className="flex flex-col gap-1">
						<label>{key}</label>
						<div contentEditable className="w-[33dvw]">
							{value}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default EditablePageContent;
