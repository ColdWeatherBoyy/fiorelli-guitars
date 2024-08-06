import { updateGuitarModelSpec } from "@/app/utilities/databaseFunctions/guitarspec.db";
import { Dispatch, FC, SetStateAction } from "react";
import Dropdown from "../components/Dropdown";
import EditableContent from "./EditableContent";

interface UpdateUnusedSpecProps {
	setNewSpec: Dispatch<SetStateAction<string>>;
	newSpec: string;
	unusedSpec: string[];
	id: number;
	isMobile: boolean;
	handleAddSpec: () => void;
}

const UpdateUnusedSpec: FC<UpdateUnusedSpecProps> = ({
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
			<Dropdown
				value={newSpec}
				setValue={setNewSpec}
				defaultOption="Select a spec"
				options={unusedSpec}
			/>
			{newSpec && (
				<EditableContent
					contentObj={{ [newSpec]: "" }}
					id={id}
					isMobile={isMobile}
					updateContentFunction={updateGuitarModelSpec}
					onSuccess={handleAddSpec}
				/>
			)}
		</div>
	);
};

export default UpdateUnusedSpec;
