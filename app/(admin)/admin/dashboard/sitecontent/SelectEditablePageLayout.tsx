"use client";

import { PageContent } from "@prisma/client";
import { FC, useState } from "react";
import EditablePageContent from "./EditablePageContent";

interface SelectEditablePageLayoutProps {
	pageContentData: PageContent[];
	titlesArray: string[];
	isMobile: boolean;
}

const SelectEditablePageLayout: FC<SelectEditablePageLayoutProps> = ({
	pageContentData,
	titlesArray,
	isMobile,
}) => {
	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<div className="w-4/5">
			<div className="flex justify-start rounded-t-md w-full text-center">
				{titlesArray.map((title, index) => (
					<div
						key={index}
						onClick={() => setSelectedTab(index)}
						className={`border border-collapse text-lg rounded-t-md border-slate-600 dark:border-slate-400 py-2 cursor-pointer w-full ${
							selectedTab === index
								? "bg-zinc-50 text-xl underline border-b-0 tracking-wider"
								: "bg-zinc-300 text-zinc-600"
						}
              `}
					>
						{title}
					</div>
				))}
			</div>
			<div className="bg-zinc-50 grid grid-cols-1 sm:grid-cols-2 border-x border-b rounded-b-md border-slate-600 dark:border-slate-400 p-2">
				{Object.entries(pageContentData[selectedTab]).map(([key, value]) => {
					if (
						key === "id" ||
						value === null ||
						value instanceof Date ||
						typeof value === "number"
					)
						return null;
					if (Array.isArray(value)) {
						const bodies = value.map((item, index) => ({
							[`body${value.length > 1 ? ` ${index + 1}` : ""}`]: item,
						}));

						return bodies.map((content, index) => (
							<EditablePageContent
								key={`${key}-${pageContentData[selectedTab].id}-${index}`}
								contentBlock={content}
								pageId={pageContentData[selectedTab].id}
								isMobile={isMobile}
							/>
						));
					} else {
						return (
							<EditablePageContent
								key={`${key}-${pageContentData[selectedTab].id}`}
								contentBlock={{ [key]: value }}
								pageId={pageContentData[selectedTab].id}
								isMobile={isMobile}
							/>
						);
					}
				})}
			</div>
		</div>
	);
};

export default SelectEditablePageLayout;
