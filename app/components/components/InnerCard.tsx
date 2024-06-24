import { roboto_mono } from "@/app/style/fonts";
import { FC } from "react";

interface InnerCardProps {
	title?: string;
	children?: React.ReactNode;
}

const InnerCard: FC<InnerCardProps> = ({ title, children }) => {
	return (
		<div className="w-full rounded-sm bg-gradient-to-br from-zinc-100 to-cyan-50 dark:from-zinc-400 dark:to-zinc-500 shadow-sm shadow-zinc-600/60 backdrop-blur-md px-6 py-4 md:px-8 md:py-6">
			{title && (
				<div
					className={`${roboto_mono.className} text-center border-b pb-2 mb-4 dark:border-cyan-800 border-cyan-600 text-xl md:text-3xl`}
				>
					{title}
				</div>
			)}
			<div className="flex justify-center w-full">{children}</div>
		</div>
	);
};

export default InnerCard;
