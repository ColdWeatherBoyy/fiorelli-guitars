"use client";
import Card from "@/app/components/components/Card";
import CardButtonLink from "@/app/components/components/CardButtonLink";
import { TextSize } from "@/app/utilities/types";
import { useRouter } from "next/navigation";
export function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	function onDismiss() {
		router.back();
	}
	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<div className="absolute inset-0 bg-zinc-950/50" onClick={onDismiss} />
			<Card>{children}</Card>
		</div>
	);
}
