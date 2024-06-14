import { roboto_mono } from "@/app/style/fonts";
import { FC } from "react";

interface CardProps {
	title?: string;
	body: string[];
	children?: React.ReactNode;
}

const Card: FC<CardProps> = ({ title, body, children }) => {
	return (
		<div className="overflow-scroll rounded-sm bg-gradient-to-br from-cyan-50/80 to-zinc-300/80 shadow shadow-cyan-100/80 backdrop-blur-md px-8 py-6 transform transition">
			{title && (
				<div
					className={`${roboto_mono.className} border-b pb-2 mb-4 border-cyan-800 text-4xl font-semibold`}
				>
					{title}
				</div>
			)}
			{body.map((paragraph, index) => (
				<div key={index}>
					<div className={`text-lg ${children && "last:mb-4"}`}>{paragraph}</div>
					{index < body.length - 1 && (
						<div className="my-4 h-[1px] w-full bg-cyan-600/40" />
					)}
				</div>
			))}
			<div className="flex justify-center">{children}</div>
		</div>
	);
};

export default Card;
