import { updateGuitarModelSpec } from "@/app/utilities/databaseFunctions/guitarspec.db";
import { camelToTitleCase } from "@/app/utilities/helpers";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import EditableContent from "./EditableContent";
import Dropdown from "../components/Dropdown";

interface AddNewContentProps {
	setNewSpec: Dispatch<SetStateAction<string>>;
	newSpec: string;
	unusedSpec: string[];
	id: number;
	isMobile: boolean;
	handleAddSpec: () => void;
}

// To-Do: ADD Variant updates
const AddNewContent: FC<AddNewContentProps> = ({
	setNewSpec,
	newSpec,
	unusedSpec,
	id,
	isMobile,
	handleAddSpec,
}) => {
	const [key, setKey] = useState(0);

	useEffect(() => {
		setKey((prevKey) => prevKey + 1);
	}, [unusedSpec]);

	return (
		<div className="flex flex-col gap-2 p-2 text-center">
			<div className="underline">Add New Spec</div>
			<Dropdown
				key={key}
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

export default AddNewContent;
