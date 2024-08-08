import AnimateWrapper from "@/app/components/AnimateWrapper";
import { getVariantGuitarModelSpec } from "@/app/utilities/databaseFunctions/guitarspec.db";
import Card from "../../components/components/Card";
import CardButtonLink from "../../components/components/CardButtonLink";

interface GuitarSpecsProps {
	params: {
		tag: string;
	};
}

const GuitarSpecs: React.FC<GuitarSpecsProps> = async ({ params: { tag } }) => {
	const guitarSpecs = await getVariantGuitarModelSpec(tag);

	if (guitarSpecs instanceof Error) {
		throw guitarSpecs;
	}

	return (
		<AnimateWrapper>
			<Card title={guitarSpecs.name + ", " + guitarSpecs.colorScheme}>
				{guitarSpecs.guitarSpec === null ? (
					<div className="text-center text-lg font-semibold p-2 border border-zinc-500 dark:border-zinc-400">
						No specs available for this guitar.
					</div>
				) : (
					Object.entries(guitarSpecs.guitarSpec).map(([key, value], index) => {
						if (
							key === "name" ||
							key === "tag" ||
							key === "id" ||
							key === "createdAt" ||
							key === "updatedAt" ||
							key === "variantGuitarModelId" ||
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
					})
				)}
				<div className="mt-2">
					<CardButtonLink text="Back to Gallery" href="/gallery" />
				</div>
			</Card>
		</AnimateWrapper>
	);
};

export default GuitarSpecs;
