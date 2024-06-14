"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import MiniWrapper from "./components/layout/MiniWrapper";

export default function Template({ children }: { children: React.ReactNode }) {
	const key = usePathname();
	return (
		<>
			{key === "/welcome" ? (
				<>{children}</>
			) : (
				<MiniWrapper>
					<AnimatePresence mode="sync">
						<motion.div
							key={key}
							initial={{ y: 20, opacity: 0, backdropFilter: "blur(0px)" }}
							animate={{ y: 0, opacity: 1, backdropFilter: "blur(12px)" }}
							exit={{ y: -20, opacity: 0, backdropFilter: "blur(0px)" }}
							transition={{ ease: "easeInOut", duration: 0.5 }}
							className="max-h-fit max-w-[95%] md:max-w-[70%] mt-36"
						>
							{children}
						</motion.div>
					</AnimatePresence>
				</MiniWrapper>
			)}
		</>
	);
}
