"use client";

import AnimateWrapper from "@/app/components/components/AnimateWrapper";
import Card from "@/app/components/components/Card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
export function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	function onDismiss() {
		router.back();
	}
	return (
		<div className="fixed scroll-auto inset-0 flex items-center justify-center z-30">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="absolute inset-0 bg-zinc-950/50"
				onClick={onDismiss}
			/>
			<AnimateWrapper>
				<Card>{children}</Card>
			</AnimateWrapper>
		</div>
	);
}
