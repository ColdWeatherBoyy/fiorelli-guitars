"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function AnimateWrapper({ children }: { children: React.ReactNode }) {
	return (
		<AnimatePresence mode="sync">
			<motion.div
				// initial={{ y: 20, opacity: 0, backdropFilter: "blur(0px)" }}
				// animate={{ y: 0, opacity: 1, backdropFilter: "blur(12px)" }}
				// exit={{ y: -20, opacity: 0, backdropFilter: "blur(0px)" }}
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: -20, opacity: 0 }}
				transition={{ ease: "easeInOut", duration: 0.35 }}
				className="flex justify-center"
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
