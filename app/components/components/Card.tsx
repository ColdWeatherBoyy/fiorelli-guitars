import { TextSize } from "@/app/utilities/types";
import { FC } from "react";

interface CardProps {
	title?: string;
	subtitle?: string;
	body: string;
	size: TextSize;
}

const Card: FC<CardProps> = ({ title, subtitle, body, size }) => {
	const textClassTitle =
		size === TextSize.small
			? { mobile: "text-2xl", desktop: "md:text-4xl" }
			: size === TextSize.medium
			? { mobile: "text-4xl", desktop: "md:text-6xl" }
			: { mobile: "text-6xl", desktop: "md:text-8xl" };
	const textClassSubtitle =
		size === TextSize.small
			? { mobile: "text-lg", desktop: "md:text-2xl" }
			: size === TextSize.medium
			? { mobile: "text-2xl", desktop: "md:text-4xl" }
			: { mobile: "text-4xl", desktop: "md:text-6xl" };
	const textClassBody =
		size === TextSize.small
			? { mobile: "text-md", desktop: "md:text-lg" }
			: size === TextSize.medium
			? { mobile: "text-lg", desktop: "md:text-xl" }
			: { mobile: "text-xl", desktop: "md:text-2xl" };
	return (
		<div className="rounded-md bg-zinc-100/40 shadow shadow-zinc-300 backdrop-blur-md p-4">
			<div className={`${textClassTitle.mobile} ${textClassTitle.desktop} py-2`}>
				{title}
				<div className="my-1 h-[1px] w-full bg-black" />
			</div>
			<div className={`${textClassSubtitle.mobile} ${textClassSubtitle.desktop}`}>
				{subtitle}
			</div>
			<div className={`${textClassBody.mobile} ${textClassBody.desktop}`}>{body}</div>
		</div>
	);
};

export default Card;
