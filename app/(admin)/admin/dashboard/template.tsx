import AnimateWrapper from "@/app/components/AnimateWrapper";

export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<AnimateWrapper>
			<div className="w-full flex flex-col items-center justify-start gap-6 mt-8">
				{children}
			</div>
		</AnimateWrapper>
	);
}
