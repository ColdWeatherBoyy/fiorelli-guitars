"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Dispatch, FC, SetStateAction } from "react";
import Title from "../components/Title";
import Heading from "../components/Heading";
import { CloudinaryResource } from "@/app/utilities/types";
import { getBlurDataUrl } from "@/app/utilities/imageHelpers";

interface UploaderProps {
	tags: string[];
	setNewResource: Dispatch<SetStateAction<CloudinaryResource | null>>;
	isMobile: boolean;
}

const Uploader: FC<UploaderProps> = ({ tags, setNewResource, isMobile }) => {
	return (
		<div className="flex flex-col gap-4">
			<Heading title={`Upload Images with the Following Tags: ${tags.join(", ")}`} />
			<CldUploadWidget
				uploadPreset="Main_Fiorelli"
				options={{
					tags: [...tags],
					multiple: true,
				}}
				onSuccess={async (result, current_asset) => {
					// To-Do: Handle Result Type
					const result2 = result.info as any;
					const blurDataUrl = await getBlurDataUrl(result2.public_id);

					const newResource: CloudinaryResource = {
						public_id: result2.public_id,
						secure_url: result2.secure_url,
						context: result2.tags,
						width: 250,
						height: 250,
						blurDataUrl: blurDataUrl,
					};
					setNewResource(newResource);
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
		</div>
	);
};

export default Uploader;
