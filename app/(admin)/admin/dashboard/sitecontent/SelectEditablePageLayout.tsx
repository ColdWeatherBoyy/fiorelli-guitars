"use client";

import { FC, useState } from "react";
import EditablePageContent from "./EditablePageContent";

interface SelectEditablePageLayoutProps {
	pageContentBlocks: [string, string][][];
	titlesArray: string[];
	isMobile: boolean;
}

const SelectEditablePageLayout: FC<SelectEditablePageLayoutProps> = ({
	pageContentBlocks,
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
				{pageContentBlocks[selectedTab].map((contentBlock, index) => {
					return (
						<EditablePageContent
							key={titlesArray[selectedTab] + index}
							contentBlock={contentBlock}
							isMobile={isMobile}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default SelectEditablePageLayout;
