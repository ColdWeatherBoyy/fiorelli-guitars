import { Dispatch, FC, SetStateAction, useState } from "react";
import AdminModalWrapper from "../notifications/AdminModalWrapper";
import { Reorder } from "framer-motion";
import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";

interface AboutImageModalProps {
	setOpen: Dispatch<SetStateAction<boolean>>;
	fullResources: CloudinaryResource[];
}

const AboutImageModal: FC<AboutImageModalProps> = ({ setOpen, fullResources }) => {
	const [resources, setResources] = useState<CloudinaryResource[]>(fullResources);
	return (
		<AdminModalWrapper setOpen={setOpen}>
			<div className="w-[90dvw] text-center p-2 flex flex-col gap-6 rounded-sm bg-zinc-50 dark:bg-zinc-600 border border-2 border-slate-400 dark:border-slate-500 shadow-sm shadow-slate-400 dark:shadow-slate-900">
				<div className="text-lg font-semibold">Pick Images and Order</div>
				<div className="text-sm">
					Select up to 4 images to display in the About section. Drag and drop to order.
				</div>
				<Reorder.Group
					axis="x"
					values={resources}
					onReorder={setResources}
					className="flex gap-4 items-center overflow-x-auto w-full relative"
				>
					{resources.map((resource, index) => (
						<Reorder.Item
							key={resource.public_id}
							value={resource}
							className="min-w-40 md:min-w-52"
						>
							{index < 4 && (
								<div
									className={`px-3 py-1 text-center font-bold absolute z-10 bg-cyan-400 dark:bg-cyan-500`}
								>
									{index + 1}
								</div>
							)}
							<CldImage
								onClick={() => console.log("clicked")}
								width={250}
								height={250}
								src={resource.secure_url}
								alt={resource.public_id}
								placeholder="blur"
								blurDataURL={resource.blurDataUrl}
								preserveTransformations
								className={`rounded-sm pointer-events-none ${
									index < 4
										? "border-4 border-cyan-400 dark:border-cyan-500"
										: `border border-slate-500 dark:border-slate-300 opacity-70 shadow shadow-slate-600`
								} shadow shadow-slate-600`}
							/>
						</Reorder.Item>
					))}
				</Reorder.Group>
			</div>
		</AdminModalWrapper>
	);
};

export default AboutImageModal;
