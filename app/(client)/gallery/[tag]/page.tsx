import AnimateWrapper from "@/app/components/AnimateWrapper";
import { getGuitarSpecs } from "@/app/utilities/databaseFunctions";
import { TextSize } from "@/app/utilities/types";
import Card from "../../components/components/Card";
import CardButtonLink from "../../components/components/CardButtonLink";

interface GuitarSpecsProps {
	params: {
		tag: string;
	};
}

const GuitarSpecs: React.FC<GuitarSpecsProps> = async ({ params: { tag } }) => {
	const guitarSpecs = await getGuitarSpecs(tag);
	if (guitarSpecs instanceof Error) {
		throw guitarSpecs;
	}
	return (
		<AnimateWrapper>
			<Card title={guitarSpecs.name}>
				{Object.entries(guitarSpecs).map(([key, value], index) => {
					if (
						key === "name" ||
						key === "tag" ||
						key === "id" ||
						key === "createdAt" ||
						key == "updatedAt" ||
						value === null
					)
						return null;
					return (
						<div
							key={key + index}
							className="grid grid-cols-2 w-full shadow-sm shadow-zinc-500 dark:shadow-zinc-400 bg-zinc-100 dark:bg-zinc-500"
						>
							<div className="font-semibold text-lg p-2 border border-r-[0.5px] border-zinc-500 dark:border-zinc-400">
								{key
									.replace(/([a-z])([A-Z])/g, "$1 $2")
									.replace(/\b\w/g, (char) => char.toUpperCase())}
							</div>
							<div className="font-base p-2 border border-l-[0.5px] border-zinc-500 dark:border-zinc-400">
								{value.toString()}
							</div>
						</div>
					);
				})}
				<div className="mt-2">
					<CardButtonLink text="Back to Gallery" href="/gallery" size={TextSize.small} />
				</div>
			</Card>
		</AnimateWrapper>
	);
};

export default GuitarSpecs;
