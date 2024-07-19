import {
	deleteGuitarSpec,
	getGuitarSpecs,
	updateGuitarSpec,
} from "@/app/utilities/databaseFunctions";
import { GuitarSpec } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import AddNewContent from "./AddNewContent";
import EditableContent from "./EditableContent";

interface EditableGuitarInfoLayoutProps {
	guitarSpecs: GuitarSpec[];
	selectedTab: number;
	isMobile: boolean;
}

const EditableGuitarInfoLayout: FC<EditableGuitarInfoLayoutProps> = ({
	guitarSpecs,
	selectedTab,
	isMobile,
}) => {
	const [specs, setSpecs] = useState<GuitarSpec[]>(guitarSpecs);
	const [unusedSpec, setUnusedSpec] = useState<(keyof GuitarSpec)[]>([]);
	const [usedSpecs, setUsedSpecs] = useState<(keyof GuitarSpec)[]>([]);
	const [newSpec, setNewSpec] = useState<string>("");

	useEffect(() => {
		const unusedSpecs: (keyof GuitarSpec)[] = [];
		const usedSpecs: (keyof GuitarSpec)[] = [];
		Object.entries(specs[selectedTab]).forEach(([key, value]) => {
			if (value === null) {
				unusedSpecs.push(key as keyof GuitarSpec);
			} else if (key === "id" || value instanceof Date || typeof value === "number") {
				return null;
			} else {
				usedSpecs.push(key as keyof GuitarSpec);
			}
		});
		setUnusedSpec(unusedSpecs);
		setUsedSpecs(usedSpecs);
	}, [specs, selectedTab]);

	const handleSpecChange = async () => {
		const newSpecs = await getGuitarSpecs(specs[selectedTab].tag);
		if (!newSpecs) {
			// TODO: Add a notification here
			// console.error("Failed to get new specs");
			return;
		}
		setSpecs((prevSpecs) => {
			const newSpecsArray = [...prevSpecs];
			newSpecsArray[selectedTab] = newSpecs;
			return newSpecsArray;
		});
		setNewSpec("");
	};

	return (
		<>
			{usedSpecs.map((spec) => {
				const contentValue = specs[selectedTab][spec];
				if (typeof contentValue !== "string") return null;
				return (
					<EditableContent
						key={`${spec}-${specs[selectedTab].id}`}
						contentObj={{ [spec]: contentValue }}
						id={specs[selectedTab].id}
						isMobile={isMobile}
						updateContentFunction={updateGuitarSpec}
						deleteContentFunction={deleteGuitarSpec}
						onSuccess={handleSpecChange}
					/>
				);
			})}

			{unusedSpec.length > 0 && (
				<AddNewContent
					setNewSpec={setNewSpec}
					newSpec={newSpec}
					unusedSpec={unusedSpec}
					id={specs[selectedTab].id}
					isMobile={isMobile}
					handleAddSpec={handleSpecChange}
				/>
			)}
		</>
	);
};

export default EditableGuitarInfoLayout;
