"use client";

import SideBar from "@/app/(admin)/components/SideBar";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";

interface LayoutDisplayProps {
	children: React.ReactNode;
	isMobile: boolean;
}

const LayoutDisplay: FC<LayoutDisplayProps> = ({ children, isMobile }) => {
	const [open, setOpen] = useState(isMobile ? false : true);

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
			<div
				ref={sideBarRef}
				className={`absolute h-full ${isMobile ? "w-full " : "w-1/6"} min-w-36`}
			>
				<SideBar open={open} setOpen={setOpen} isMobile={isMobile} />
			</div>
			<div
				style={{ marginLeft: open ? sideBarWidthMargin : "0px" }}
				className={`transition-all duration-300 flex-1 flex justify-center items-start`}
			>
				<div className="mx-5 w-full">{children}</div>
			</div>
		</div>
	);
};

export default LayoutDisplay;
