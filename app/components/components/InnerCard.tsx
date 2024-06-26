import { roboto_serif } from "@/app/style/fonts";
import { FC } from "react";

interface InnerCardProps {
	title?: string;
	children?: React.ReactNode;
}

const InnerCard: FC<InnerCardProps> = ({ title, children }) => {
	return (
		<div className="rounded-sm bg-gradient-to-br from-zinc-100 to-cyan-50 dark:from-zinc-400 dark:to-zinc-500 shadow-sm shadow-zinc-600/60 backdrop-blur-md p-2 md:p-4">
			{title && (
				<div
					className={`${roboto_serif.className} text-center border-b pb-2 mb-4 dark:border-cyan-800 border-cyan-600 text-lg md:text-xl`}
				>
					{title}
				</div>
			)}
			<div className="flex w-full justify-center">{children}</div>
		</div>
	);
};

export default InnerCard;
