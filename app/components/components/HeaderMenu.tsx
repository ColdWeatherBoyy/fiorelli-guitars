import { ScreenSize } from "@/app/utilities/types";
import { motion } from "framer-motion";
import { Dispatch, FC, RefObject, SetStateAction } from "react";
import HeaderLink from "./HeaderLink";

interface MobileHeaderMenuProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	menuRef: RefObject<HTMLDivElement>;
	screenSize: ScreenSize | null;
}

const HeaderMenu: FC<MobileHeaderMenuProps> = ({
	isOpen,
	setIsOpen,
	menuRef,
	screenSize,
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
					className="absolute rounded-sm top-16 border border-cyan-800 border-r-0 w-[40%] right-0 bg-gradient-to-b from-cyan-50 to-zinc-200 dark:bg-cyan-950 flex flex-col items-center gap-6 p-6 z-30"
					onClick={() => setIsOpen(false)}
				>
					<HeaderLink
						href="/about"
						text="About"
						isMobile={screenSize === ScreenSize.extraSmall}
					/>
					<div className="h-0.5 w-full rounded-full bg-cyan-700/30" />
					<HeaderLink
						href="/gallery"
						text="Gallery"
						isMobile={screenSize === ScreenSize.extraSmall}
					/>
					<div className="h-0.5 w-full rounded-full bg-cyan-700/30" />
					<HeaderLink
						href="/contact"
						text="Contact"
						isMobile={screenSize === ScreenSize.extraSmall}
					/>
				</motion.div>
			) : (
				<>
					<HeaderLink href="/about" text="About" />
					<HeaderLink href="/gallery" text="Gallery" />
					<HeaderLink href="/contact" text="Contact" />
				</>
			)}
		</>
	);
};

export default HeaderMenu;
