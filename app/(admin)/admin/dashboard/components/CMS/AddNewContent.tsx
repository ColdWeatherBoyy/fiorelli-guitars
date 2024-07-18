import { updateGuitarSpec } from "@/app/utilities/databaseFunctions";
import { camelToTitleCase } from "@/app/utilities/helpers";
import { Dispatch, FC, SetStateAction } from "react";
import EditableContent from "./EditableContent";

interface AddNewContentProps {
	setNewSpec: Dispatch<SetStateAction<string>>;
	newSpec: string;
	unusedSpec: string[];
	id: number;
	isMobile: boolean;
	handleAddSpec: () => void;
}

const AddNewContent: FC<AddNewContentProps> = ({
	setNewSpec,
	newSpec,
	unusedSpec,
	id,
	isMobile,
	handleAddSpec,
}) => {
	return (
		<div className="flex flex-col gap-2 p-2 text-center">
			<div className="underline">Add New Spec</div>
			<select
				onChange={(e) => setNewSpec(e.target.value)}
				defaultValue=""
				className="p-2 rounded-sm border border-slate-400 dark:border-slate-500 dark:placeholder-zinc-200 bg-zinc-50 dark:bg-zinc-600 shadow-inner-outer focus:shadow-md shadow-slate-400 dark:shadow-slate-900 focus:shadow-sm focus:shadow-slate-400 dark:focus:shadow-slate-900 focus:outline-0 focus:ring-1 focus:ring-cyan-400 dark:focus:ring-cyan-800 focus:ring-opacity-50 transition-all ease-in-out duration-200"
			>
				<option value="" disabled>
					Select a spec
				</option>
				{unusedSpec.map((spec) => (
					<option key={spec} value={spec}>
						{camelToTitleCase(spec)}
					</option>
				))}
			</select>
			{newSpec && (
				<EditableContent
					contentObj={{ [newSpec]: "" }}
					id={id}
					isMobile={isMobile}
					updateContentFunction={updateGuitarSpec}
					onSuccess={handleAddSpec}
				/>
			)}
		</div>
	);
};

export default AddNewContent;