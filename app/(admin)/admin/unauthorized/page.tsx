import Link from "next/link";
import React from "react";
import AdminButtonLink from "../../components/AdminButtonLink";
import AnimateWrapper from "@/app/components/AnimateWrapper";

const Unauthorized = () => {
	return (
		<AnimateWrapper>
			<div className="w-fit flex flex-col items-center justify-start gap-4">
				<div className="text-4xl font-semibold">Unauthorized Access</div>
				<div className="flex flex-col items-center justify-center gap-4 w-full border border-zinc-500 p-4 bg-zinc-100 rounded-lg shadow-sm shadow-slate-400 dark:shadow-slate-900">
					<div className="text-lg">You are not authorized to view this page.</div>
					<AdminButtonLink href="/admin/signin" text="Return to Sign In" />
				</div>
			</div>
		</AnimateWrapper>
	);
};

export default Unauthorized;
