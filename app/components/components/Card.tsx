import { playfair_display, roboto_mono } from "@/app/style/fonts";
import { TextSize } from "@/app/utilities/types";
import { FC } from "react";

interface CardProps {
	title?: string;
	body: string;
}

const Card: FC<CardProps> = ({ title, body }) => {
	return (
		<div className="rounded-md bg-gradient-to-br from-zinc-50/60 to-zinc-400/60 shadow shadow-zinc-300 backdrop-blur-lg p-6 transform transition">
			{title && (
				<div
					className={`${roboto_mono.className} border-b pb-2 mb-4 border-zinc-950 text-4xl font-semibold`}
				>
					{title}
				</div>
			)}
			<div className={`text-lg`}>{body}</div>
		</div>
	);
};

export default Card;
