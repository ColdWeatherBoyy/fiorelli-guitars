import Card from "@/app/(client)/components/components/Card";
import ModalWrapper from "@/app/(client)/components/ModalWrapper";
import XIcon from "@/app/components/SVGs/XIcon";
import { roboto_serif } from "@/app/style/fonts";
import { getGuitarSpecs } from "@/app/utilities/databaseFunctions";
import { useDeviceType } from "@/app/utilities/hooks.server";
import Link from "next/link";

interface GuitarSpecsProps {
	params: {
		tag: string;
	};
}

const GuitarSpecs: React.FC<GuitarSpecsProps> = async ({ params: { tag } }) => {
	const guitarSpecs = await getGuitarSpecs(tag);
	const isMobile = useDeviceType();

	if (guitarSpecs instanceof Error) {
		throw guitarSpecs;
	}

	return (
		<ModalWrapper>
			<div
				className={`overflow-auto w-fit max-w-[90dvw] sm:max-w-[75dvw] max-h-[70dvh] sm:max-h-[63dvh] flex flex-col gap-2 items-center rounded-sm bg-cyan-100 dark:bg-cyan-900 shadow-sm shadow-zinc-600/60 backdrop-blur-md p-2 sm:p-6 transform transition`}
			>
				<Link
					href="/gallery"
					className={`absolute right-3 top-3 active:scale-95 transition-all duration-100 ease-in-out
									${!isMobile && "hover:scale-[110%]"}`}
				>
					<XIcon />
				</Link>
				<div
					className={`${roboto_serif.className} text-center border-b pb-2 border-cyan-800 dark:border-cyan-600 mb-2 text-2xl md:text-4xl font-semibold`}
				>
					{guitarSpecs.name}
				</div>{" "}
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
			</div>
		</ModalWrapper>
	);
};

export default GuitarSpecs;
