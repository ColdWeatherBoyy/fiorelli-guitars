"use client";

import { CldUploadWidget } from "next-cloudinary";
import { FC } from "react";

interface UploaderProps {
	isMobile: boolean;
}

const Uploader: FC<UploaderProps> = ({ isMobile }) => {
	return (
		<>
			<CldUploadWidget
				uploadPreset="Main_Fiorelli"
				options={{
					tags: ["test"],
					multiple: true,
				}}
				onSuccess={(result, current_asset) => {
					console.log(result, current_asset);
				}}
			>
				{({ open }) => {
					return (
						// AdminButtonLink caused a weird error, so doing it in here directly
						<button
							className={`self-center text-center w-fit text-base rounded-lg bg-zinc-50 dark:bg-zinc-600 shadow-sm shadow-slate-400 dark:shadow-slate-900 transition-all ease-in-out duration-200 border border-slate-400 dark:border-slate-500 p-1 ${
								!isMobile &&
								"hover:shadow-md hover:shadow-slate-400 dark:hover:shadow-slate-900 hover:transform hover:translate-x-[3px] hover:translate-y-[-3px]"
							} active:shadow-inner active:shadow-slate-300 dark:active:shadow-slate-800 active:shadow-inner active:translate-x-[0px] active:translate-y-[0px] cursor-pointer`}
							onClick={() => open()}
						>
							Open Upload Form
						</button>
					);
				}}
			</CldUploadWidget>
		</>
	);
};

export default Uploader;
