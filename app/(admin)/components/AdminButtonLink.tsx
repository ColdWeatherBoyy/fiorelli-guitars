"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useFormStatus } from "react-dom";

interface AdminButtonLinkProps {
	text: string;
	href?: string;
	handleClick?: () => void;
	goBack?: boolean;
	isMobile: boolean;
}

const AdminButtonLink: FC<AdminButtonLinkProps> = ({
	text,
	href,
	handleClick,
	goBack,
	isMobile,
}) => {
	const { pending } = useFormStatus();
	const router = useRouter();

	if (goBack && !handleClick) handleClick = () => router.back();

	const classStyle = `text-center w-fit text-base rounded-lg bg-zinc-50 dark:bg-zinc-600 shadow-sm shadow-slate-400 dark:shadow-slate-900 transition-all ease-in-out duration-200 border border-slate-400 dark:border-slate-500 p-1 ${
		pending
			? "opacity-50 cursor-not-allowed"
			: `${
					!isMobile &&
					"hover:shadow-md hover:shadow-slate-400 dark:hover:shadow-slate-900 hover:transform hover:translate-x-[3px] hover:translate-y-[-3px]"
			  } active:shadow-inner active:shadow-slate-300 dark:active:shadow-slate-800 active:shadow-inner active:translate-x-[0px] active:translate-y-[0px] cursor-pointer`
	}`;
	return (
		<>
			{href ? (
				<Link href={href} className={classStyle}>
					{text}
				</Link>
			) : (
				<button
					className={`self-center ${classStyle}`}
					onClick={handleClick}
					disabled={pending}
				>
					{text}
				</button>
			)}
		</>
	);
};

export default AdminButtonLink;
