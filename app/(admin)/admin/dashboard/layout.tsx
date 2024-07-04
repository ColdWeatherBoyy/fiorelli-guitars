"use client";

import { useEffect, useRef, useState } from "react";
import "../../../style/globals.css";
import SideBar from "../../components/SideBar";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [open, setOpen] = useState(true);
	const [sideBarWidthMargin, setSideBarWidthMargin] = useState("0px");
	const sideBarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateSideBarWidthMargin = () => {
			if (sideBarRef.current) {
				setSideBarWidthMargin(`${sideBarRef.current.offsetWidth}px`);
			}
		};

		updateSideBarWidthMargin();

		window.addEventListener("resize", updateSideBarWidthMargin);

		return () => window.removeEventListener("resize", updateSideBarWidthMargin);
	}, []);

	return (
		<div className="flex relative overflow-hidden h-dvh">
			<div ref={sideBarRef} className="absolute h-full w-1/6 min-w-fit">
				<SideBar open={open} setOpen={setOpen} />
			</div>
			<div
				style={{ marginLeft: open ? sideBarWidthMargin : "0px" }}
				className={`transition-all duration-300 flex-1 flex justify-center items-start`}
			>
				<div className="w-full">{children}</div>
			</div>
		</div>
	);
}
