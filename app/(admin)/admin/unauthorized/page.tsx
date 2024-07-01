import Link from "next/link";
import React from "react";

const Unauthorized = () => {
	return (
		<div className="w-fit flex flex-col items-center justify-start gap-4">
			<div className="text-4xl font-semibold text-zinc-950">Unauthorized Access</div>
			<div className="flex flex-col items-center justify-center gap-4 w-full border border-zinc-500 p-4 bg-zinc-100 rounded-lg shadow-md">
				<div className="text-lg">You are not authorized to view this page.</div>
				<Link
					href="/admin/signin"
					className="border border-zinc-500 p-1 bg-zinc-100 rounded-lg"
				>
					Return to Sign In
				</Link>
			</div>
		</div>
	);
};

export default Unauthorized;
