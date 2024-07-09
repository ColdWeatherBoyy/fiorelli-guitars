"use client";

import { toTitleCase } from "@/app/utilities/helpers";
import { FC, useState } from "react";

interface EditablePageContentProps {
	contentBlock: [string, string];
}

const EditablePageContent: FC<EditablePageContentProps> = ({ contentBlock }) => {
	return (
		<div>
			<div className="flex flex-col gap-1">
				<div>{toTitleCase(contentBlock[0])}</div>
				<textarea defaultValue={contentBlock[1]} />
			</div>
		</div>
	);
};

export default EditablePageContent;
