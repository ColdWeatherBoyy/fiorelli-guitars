import RightCaret from "@/app/components/SVGs/RightCaretIcon";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";

interface SideBarProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	isMobile: boolean;
}

const SideBar: FC<SideBarProps> = ({ open, setOpen, isMobile }) => {
	const pageOptions = [
		{ link: "/admin/dashboard/", text: "Home" },
		{ link: "/admin/dashboard/customers", text: "Customers" },
		{ link: "/admin/dashboard/messages", text: "Messages" },
		{ link: "/admin/dashboard/customers/search", text: "Search" },
		{ link: "/admin/dashboard/users", text: "Admins" },
		{ link: "/admin/dashboard/sitecontent", text: "CMS" },
		{ link: "/admin/dashboard/guitars", text: "Guitars" },
	];

	const handleMobileClick = () => {
		if (isMobile) {
			setTimeout(() => setOpen(false), 500);
		}
	};

	return (
		<motion.div
			initial={{ x: "-100%" }}
			animate={{ x: open ? 0 : "-100%" }}
			transition={{ ease: "easeInOut", duration: 0.4 }}
			className="h-full min-h-dvh bg-gradient-to-b dark:from-slate-600 dark:to-slate-500 from-slate-400 to-slate-500 px-6 py-10 rounded-sm shadow-sm shadow-slate-400 dark:shadow-slate-900"
		>
			<motion.div
				className={`absolute right-0 top-6`}
				animate={{ scaleX: open ? -1 : 1, x: open ? 10 : 30 }}
				transition={{ ease: "easeInOut", duration: 0.2 }}
				onClick={() => setOpen((prev) => !prev)}
			>
				<RightCaret
					className={`cursor-pointer active:text-cyan-300 dark:active:text-cyan-500 ${
						!isMobile && "hover:text-cyan-300 dark:hover:text-cyan-500"
					}`}
				/>
			</motion.div>
			<div className="flex flex-col gap-1">
				{pageOptions.map((option) => (
					<Link
						href={option.link}
						key={option.text.toLowerCase().replace(/ /g, "-")}
						className={`w-fit font-semibold transition-all duration-200 ease-in-out active:text-cyan-300 dark:active:text-cyan-500 active:underline ${
							!isMobile
								? "text-lg hover:text-xl hover:underline hover:text-cyan-300 dark:hover:text-cyan-500 hover:translate-x-2 active:translate-x-0 active:text-base"
								: "text-lg text-center w-full active:text-base"
						}`}
						onClick={handleMobileClick}
						aria-label={`Go to ${option.text}`}
					>
						{option.text}
					</Link>
				))}
				<button
					className={`w-fit font-semibold transition-all duration-200 ease-in-out active:text-cyan-300 dark:active:text-cyan-500 active:underline ${
						!isMobile
							? "text-lg hover:text-xl hover:underline hover:text-cyan-300 dark:hover:text-cyan-500 hover:translate-x-2 active:translate-x-0 active:text-base"
							: "text-lg text-center w-full active:text-xl"
					}`}
					onClick={() => signOut()}
					aria-label="Sign Out"
				>
					Sign Out
				</button>
			</div>
		</motion.div>
	);
};

export default SideBar;
