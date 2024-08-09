import AnimateWrapper from "@/app/components/AnimateWrapper";
import FullLogo from "@/app/components/SVGs/FullLogo";
import { useDeviceType } from "@/app/utilities/hooks.server";
import Link from "next/link";
import { FC } from "react";
import Title from "../dashboard/components/components/Title";

interface AuthCardProps {
	title: string;
	children: React.ReactNode;
}

const AuthCard: FC<AuthCardProps> = ({ title, children }) => {
	const isMobile = useDeviceType();

	return (
		<AnimateWrapper>
			<div className="flex flex-col items-center gap-2 h-dvh pt-[25dvh]">
				<div className="bg-slate-100 dark:bg-slate-600 border border-slate-400 dark:border-slate-500 rounded-sm p-10 shadow-sm shadow-slate-400 dark:shadow-slate-900 flex flex-col gap-4 justify-center items-center">
					<Title title={title} />
					<Link
						href="/"
						className={`${!isMobile && "hover:text-cyan-600"} active:text-cyan-700`}
						aria-label="Home"
					>
						<FullLogo color="currentColor" />
					</Link>
					{children}
				</div>
			</div>
		</AnimateWrapper>
	);
};

export default AuthCard;
