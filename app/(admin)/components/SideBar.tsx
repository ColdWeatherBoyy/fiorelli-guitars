import RightCaret from "@/app/components/SVGs/RightCaretIcon";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";

interface SideBarProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar: FC<SideBarProps> = ({ open, setOpen }) => {
	const pageOptions = [
		{ link: "/admin/dashboard/", text: "Home" },
		{ link: "/admin/dashboard/customers", text: "Customers" },
		{ link: "/admin/dashboard/messages", text: "Messages" },
		{ link: "/admin/dashboard/customers/search", text: "Find Customer" },
	];

	return (
		<motion.div
			initial={{ x: "-100%" }}
			animate={{ x: open ? 0 : "-100%" }}
			transition={{ ease: "easeInOut", duration: 0.4 }}
		>
			<div className="h-dvh bg-gradient-to-b dark:from-slate-600 dark:to-slate-500 from-slate-400 to-slate-500 px-6 py-10 rounded-sm shadow-sm shadow-zinc-800 dark:shadow-sm dark:shadow-zinc-500">
				<motion.div
					className={`absolute right-0 top-6`}
					animate={{ scaleX: open ? -1 : 1, x: open ? 10 : 30 }}
					transition={{ ease: "easeInOut", duration: 0.2 }}
					onClick={() => setOpen((prev) => !prev)}
				>
					<RightCaret className="cursor-pointer hover:text-cyan-300 dark:hover:text-cyan-500" />
				</motion.div>
				<div className="flex flex-col gap-1">
					{pageOptions.map((option) => (
						<Link
							href={option.link}
							key={option.text.toLowerCase().replace(/ /g, "-")}
							className="w-fit text-base font-semibold hover:text-lg hover:underline hover:text-cyan-300 dark:hover:text-cyan-500 hover:translate-x-2 transition-all duration-200 ease-in-out"
						>
							{option.text}
						</Link>
					))}
					<button
						className="w-fit text-base font-semibold hover:text-lg hover:underline hover:text-cyan-300 dark:hover:text-cyan-500 hover:translate-x-2 transition-all duration-200 ease-in-out"
						onClick={() => signOut()}
					>
						Sign Out
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default SideBar;
