import { ScreenSize } from "@/app/utilities/types";
import { motion } from "framer-motion";
import { Dispatch, FC, RefObject, SetStateAction } from "react";
import NavLink from "../navComponents/NavLink";

interface MobileHeaderMenuProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	menuRef: RefObject<HTMLDivElement>;
	screenSize: ScreenSize | null;
	isMobile: boolean;
}

const HeaderMenu: FC<MobileHeaderMenuProps> = ({
	isOpen,
	setIsOpen,
	menuRef,
	screenSize,
	isMobile,
}) => {
	return (
		<>
			{screenSize === ScreenSize.extraSmall ? (
				<motion.div
					ref={menuRef}
					initial={false}
					animate={isOpen ? "open" : "closed"}
					variants={{
						closed: { opacity: 0, x: "200%", display: "none" },
						open: { opacity: 1, x: 0, display: "flex" },
					}}
					transition={{ ease: "easeInOut", duration: 0.2 }}
					className="z-20 absolute rounded-sm top-16 border border-cyan-700/30 dark:border-cyan-500/30 border-r-0 w-[40%] right-0 bg-gradient-to-b from-cyan-100 dark:from-cyan-900 to-zinc-200 dark:to-zinc-800 dark:bg-cyan-950 flex flex-col items-center gap-6 p-6 z-30 shadow-sm shadow-zinc-600/60"
					onClick={() => setIsOpen(false)}
				>
					<NavLink href="/about" text="About" isMobile={isMobile} />
					<div className="h-0.5 w-full rounded-full dark:bg-cyan-500/30 bg-cyan-700/30" />
					<NavLink href="/gallery" text="Gallery" isMobile={isMobile} />
					<div className="h-0.5 w-full rounded-full dark:bg-cyan-500/30 bg-cyan-700/30" />
					<NavLink href="/contact" text="Contact" isMobile={isMobile} />
				</motion.div>
			) : (
				<>
					<NavLink href="/about" text="About" isMobile={isMobile} />
					<NavLink href="/gallery" text="Gallery" isMobile={isMobile} />
					<NavLink href="/contact" text="Contact" isMobile={isMobile} />
				</>
			)}
		</>
	);
};

export default HeaderMenu;
