import InfoIcon from "@/app/components/SVGs/InfoIcon";
import { roboto_serif } from "@/app/style/fonts";
import Link from "next/link";
import { FC } from "react";

interface InnerCardProps {
	title?: string;
	tag?: string;
	isMobile: boolean;
	children?: React.ReactNode;
}

const InnerCard: FC<InnerCardProps> = ({ title, tag, children, isMobile }) => {
	return (
		<div className="max-w-[90%] rounded-sm bg-gradient-to-br from-zinc-100 to-cyan-50 dark:from-zinc-400 dark:to-zinc-500 shadow-sm shadow-zinc-600/60 backdrop-blur-md p-2 md:p-4">
			{title && (
				<div className="flex justify-evenly">
					<div
						className={`${roboto_serif.className} flex items-center gap-4 text-center border-b pb-2 mb-4 dark:border-cyan-800 border-cyan-600 text-lg md:text-xl`}
					>
						{title}
						{tag && (
							<Link
								href={`/gallery/${tag}/`}
								className={`active:scale-95 transition-all duration-100 ease-in-out
									${!isMobile && "hover:scale-[110%]"}`}
								aria-label={`View ${title} specs`}
							>
								<InfoIcon />
							</Link>
						)}
					</div>
				</div>
			)}
			<div className="flex w-full justify-center">{children}</div>
		</div>
	);
};

export default InnerCard;
