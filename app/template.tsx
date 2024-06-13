"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
	const key = usePathname();
	return (
		<AnimatePresence mode="popLayout">
			<motion.div
				key={key}
				initial={{ y: 20, opacity: 0, backdropFilter: "blur(0px)" }}
				animate={{ y: 0, opacity: 1, backdropFilter: "blur(12px)" }}
				exit={{ y: -20, opacity: 0 }}
				transition={{ ease: "easeInOut", duration: 0.5 }}
				className="max-w-[80%] md:max-w-[60%]"
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}