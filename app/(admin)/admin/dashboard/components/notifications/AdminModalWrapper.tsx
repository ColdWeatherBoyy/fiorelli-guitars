"use client";

import AnimateWrapper from "@/app/components/AnimateWrapper";
import { motion } from "framer-motion";
import React, { Dispatch, FC, SetStateAction } from "react";

interface AdminModalWrapperProps {
	setOpen: Dispatch<SetStateAction<boolean>>;
	children: React.ReactNode;
}
const AdminModalWrapper: FC<AdminModalWrapperProps> = ({ setOpen, children }) => {
	const handleClick = () => {
		setOpen(false);
	};
	return (
		<div className={`fixed inset-0 flex items-start justify-center z-30`}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="absolute inset-0 bg-slate-950/50 -z-10"
				onClick={handleClick}
			/>
			<AnimateWrapper>
				<div className="mt-[33dvh]">{children}</div>
			</AnimateWrapper>
		</div>
	);
};

export default AdminModalWrapper;