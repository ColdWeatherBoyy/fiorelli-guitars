// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import { usePathname } from "next/navigation";

// export default function Template({ children }: { children: React.ReactNode }) {
// 	const key = usePathname();
// 	return (
// 		<>
// 			{key === "/welcome" && key.startsWith("/photo") ? (
// 				<>{children}</>
// 			) : (
// 				<AnimatePresence mode="sync">
// 					<motion.div
// 						key={key}
// 						initial={{ y: 20, opacity: 0, backdropFilter: "blur(0px)" }}
// 						animate={{ y: 0, opacity: 1, backdropFilter: "blur(12px)" }}
// 						exit={{ y: -20, opacity: 0, backdropFilter: "blur(0px)" }}
// 						transition={{ ease: "easeInOut", duration: 0.5 }}
// 					>
// 						{children}
// 					</motion.div>
// 				</AnimatePresence>
// 			)}
// 		</>
// 	);
// }
