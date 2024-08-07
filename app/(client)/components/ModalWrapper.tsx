"use client";

import Card from "@/app/(client)/components/components/Card";
import AnimateWrapper from "@/app/components/AnimateWrapper";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();

	const onDismiss = () => {
		router.push("/gallery");
	};

	return (
		<div className="absolute inset-0 flex items-center justify-center z-30">
			<div className="absolute inset-0 bg-zinc-950/50" onClick={onDismiss} />
			<AnimateWrapper>
				<Card maxHeight="max-h-dvh">{children}</Card>
			</AnimateWrapper>
		</div>
	);
};
export default ModalWrapper;
