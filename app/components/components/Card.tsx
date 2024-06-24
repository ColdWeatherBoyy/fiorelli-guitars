import { roboto_mono } from "@/app/style/fonts";
import { FC } from "react";

interface CardProps {
	title?: string;
	body?: string[];
	children?: React.ReactNode;
}

const Card: FC<CardProps> = ({ title, body, children }) => {
	return (
		<div className="flex flex-col gap-4 items-center max-h-[77dvh] max-w-[95%] sm:max-w-none overflow-scroll rounded-sm bg-gradient-to-br from-cyan-50/85 to-zinc-300/85 dark:from-cyan-950/90 dark:to-zinc-800/90 shadow-sm shadow-zinc-600/60 backdrop-blur-md px-6 py-4 md:px-8 md:py-6 transform transition">
			{title && (
				<div
					className={`${roboto_mono.className} text-center border-b pb-2 border-cyan-800 dark:border-cyan-600 text-2xl md:text-4xl font-semibold`}
				>
					{title}
				</div>
			)}
			{body &&
				body.map((paragraph, index) => (
					<div key={index}>
						<div className={`text-base md:text-lg ${children && "last:mb-4"}`}>
							{paragraph}
						</div>
						{index < body.length - 1 && (
							<div className="my-4 h-[1px] w-full bg-cyan-600/40 dark:bg-cyan-300/40" />
						)}
					</div>
				))}
			{children}
		</div>
	);
};

export default Card;
