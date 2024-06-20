"use client";
import Card from "@/app/components/components/Card";
import { useRouter } from "next/navigation";
export function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	function onDismiss() {
		router.back();
	}
	return (
		<div className="absolute h-screen w-screen bg-cyan-30">
			<Card>
				{children}
				<button onClick={onDismiss}>get me out</button>
			</Card>
		</div>
	);
}
