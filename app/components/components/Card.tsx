import { roboto_mono } from "@/app/style/fonts";
import { CloudinaryResource } from "@/app/utilities/types";
import { FC } from "react";
import PhotoCard from "./PhotoCard";
interface CardProps {
	title?: string;
	body?: string[];
	images?: CloudinaryResource[];
	children?: React.ReactNode;
	width?: string;
	maxHeight?: string;
}

const Card: FC<CardProps> = ({
	title,
	body,
	images = [],
	width = "w-fit",
	maxHeight = "max-h-[70dvh] sm:max-h-[63dvh]",
	children,
}) => {
	return (
		<div
			className={`overflow-auto ${width} max-w-[90dvw] sm:max-w-[75dvw] ${maxHeight} flex flex-col gap-2 items-center rounded-sm bg-gradient-to-br from-cyan-50/95 to-zinc-300/95 dark:from-cyan-950/95 dark:to-zinc-800/95 shadow-sm shadow-zinc-600/60 backdrop-blur-md p-6 transform transition`}
		>
			{title && (
				<div
					className={`${roboto_mono.className} text-center border-b pb-2 border-cyan-800 dark:border-cyan-600 mb-2 text-2xl md:text-4xl font-semibold`}
				>
					{title}
				</div>
			)}
			{body &&
				body.map((paragraph, index) => (
					<div key={index}>
						{/* ${children && "last:mb-4"} */}
						<div
							className={`flex ${
								index % 2 === 0
									? "flex-col-reverse md:flex-row-reverse"
									: "flex-col-reverse md:flex-row"
							} gap-2 justify-evenly items-center`}
						>
							{images[index] && <PhotoCard {...images[index]} square />}
							<div
								className={`text-base md:text-lg md:leading-relaxed lg:leading-loose ${
									images[index] && "md:w-2/3"
								}`}
							>
								{paragraph}
							</div>
						</div>
						{index < body.length - 1 && (
							<div className="my-3 h-[1px] w-full bg-cyan-600/40 dark:bg-cyan-300/40" />
						)}
					</div>
				))}

			{children}
		</div>
	);
};

export default Card;
