"use client";

import AnimateWrapper from "@/app/(client)/components/components/AnimateWrapper";
import Card from "@/app/(client)/components/components/Card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();

	const onDismiss = () => {
		router.back();
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-30">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="absolute inset-0 bg-zinc-950/50"
				onClick={onDismiss}
			/>
			<AnimateWrapper>
				<Card maxHeight="max-h-dvh">{children}</Card>
			</AnimateWrapper>
		</div>
	);
};
export default ModalWrapper;
