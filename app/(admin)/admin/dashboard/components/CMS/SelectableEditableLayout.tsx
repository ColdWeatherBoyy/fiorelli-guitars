"use client";

import {
	isGuitarModelWithSpecArray,
	isPageContentArray,
} from "@/app/utilities/typeguardFunctions";
import { GuitarModelWithSpec } from "@/app/utilities/types";
import { PageContent } from "@prisma/client";
import { FC, useState } from "react";
import EditableGuitarInfoLayout from "./EditableGuitarInfoLayout";
import EditablePageContentLayout from "./EditablePageContentLayout";
import AnimateWrapper from "@/app/components/AnimateWrapper";

interface SelectEditableLayoutProps {
	content: PageContent[] | GuitarModelWithSpec[];
	titles: string[];
	isMobile: boolean;
}

const SelectEditableLayout: FC<SelectEditableLayoutProps> = ({
	content,
	titles,
	isMobile,
}) => {
	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<AnimateWrapper>
			<div className="w-4/5 rounded-md shadow-sm shadow-slate-500 dark:shadow-slate-400">
				<div className="flex justify-start rounded-t-md w-full text-center">
					{titles.map((title, index) => (
						<div
							key={index}
							onClick={() => setSelectedTab(index)}
							className={`border border-collapse text-lg rounded-t-md border-slate-500 dark:border-slate-400 py-2 cursor-pointer w-full ${
								selectedTab === index
									? "bg-slate-100 dark:bg-slate-500 text-xl underline border-b-0 tracking-wider"
									: "bg-slate-300 dark:bg-slate-800 text-zinc-600 dark:text-zinc-300"
							}
              `}
						>
							{title}
						</div>
					))}
				</div>
				<div className="bg-slate-100 dark:bg-slate-500 grid grid-cols-1 sm:grid-cols-2 border-x border-b rounded-b-md border-slate-500 dark:border-slate-400 p-2">
					{isPageContentArray(content) ? (
						<EditablePageContentLayout
							pageContentData={content}
							selectedTab={selectedTab}
							isMobile={isMobile}
						/>
					) : isGuitarModelWithSpecArray(content) ? (
						<EditableGuitarInfoLayout
							models={content}
							selectedTab={selectedTab}
							isMobile={isMobile}
						/>
					) : (
						<div>An error has occurred.</div>
					)}
				</div>
			</div>
		</AnimateWrapper>
	);
};

export default SelectEditableLayout;
