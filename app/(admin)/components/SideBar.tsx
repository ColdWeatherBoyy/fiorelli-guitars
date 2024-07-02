"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const SideBar = () => {
	const [open, setOpen] = useState(false);

	const pageOptions = [
		{ link: "/admin", text: "Home" },
		{ link: "/admin/customers", text: "Customers" },
		{ link: "/admin/messages", text: "Messages" },
		{ link: "/admin/messages/search", text: "Find Customer" },
	];

	return (
		<motion.div
			initial={{ x: "-100%" }}
			animate={{ x: open ? 0 : "-100%" }}
			transition={{ ease: "easeInOut", duration: 0.4 }}
		>
			<div className="h-dvh bg-gradient-to-b dark:from-slate-600 dark:to-slate-500 from-slate-400 to-slate-500 pl-6 pr-2 pt-6 rounded-sm shadow-sm shadow-zinc-800 dark:shadow-sm dark:shadow-zinc-500">
				<div
					className="absolute -right-5 cursor-pointer"
					onClick={() => setOpen((prev) => !prev)}
				>
					Hi
				</div>
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
				</div>
			</div>
		</motion.div>
	);
};

export default SideBar;
