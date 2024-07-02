"use client";

import { useState } from "react";
import "../../../style/globals.css";
import SideBar from "../../components/SideBar";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [open, setOpen] = useState(true);
	return (
		<div className="flex relative overflow-hidden h-dvh">
			<div className="absolute h-full w-1/5">
				<SideBar open={open} setOpen={setOpen} />
			</div>
			<div
				className={`transition-all duration-300 flex-1 ${
					open ? "ml-[20%]" : ""
				} flex justify-center items-start`}
			>
				<div className="w-full">{children}</div>
			</div>
		</div>
	);
}
