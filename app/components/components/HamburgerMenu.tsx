import { motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface HamburgerMenuProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const HamburgerMenu: FC<HamburgerMenuProps> = ({ isOpen, setIsOpen }) => {
	const handleClick = () => {
		setIsOpen((prev) => !prev);
	};
	return (
		<button
			className="rounded-full h-10 w-10 flex flex-col gap-1.5 justify-center items-center"
			onClick={handleClick}
		>
			<motion.div
				animate={isOpen ? "open" : "closed"}
				variants={{
					closed: { rotate: 0, y: 0 },
					open: { rotate: 45, y: 10 },
				}}
				className="rounded-full h-1 w-[70%] bg-cyan-800"
			></motion.div>
			<motion.div
				animate={isOpen ? "open" : "closed"}
				variants={{
					closed: { opacity: 1 },
					open: { opacity: 0 },
				}}
				className="rounded-full h-1 w-[70%] bg-cyan-800"
			></motion.div>
			<motion.div
				animate={isOpen ? "open" : "closed"}
				variants={{
					closed: { rotate: 0, y: 0 },
					open: { rotate: -45, y: -10 },
				}}
				className="rounded-full h-1 w-[70%] bg-cyan-800"
			></motion.div>
		</button>
	);
};

export default HamburgerMenu;
