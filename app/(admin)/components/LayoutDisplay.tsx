"use client";

import { FC, useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";

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

		return () => {
			window.removeEventListener("resize", updateSideBarWidthMargin);
		};
	}, []);

	return (
		<div className="flex min-h-dvh">
			<div ref={sideBarRef} className={`${isMobile ? "w-full " : "w-1/6"} min-w-36`}>
				<SideBar open={open} setOpen={setOpen} isMobile={isMobile} />
			</div>
			<div
				style={{ marginLeft: !open ? `-${sideBarWidthMargin}` : "0px" }}
				className={`transition-all duration-300 flex-1 flex justify-center items-start mb-8`}
			>
				<div className="mx-5 w-full">{children}</div>
			</div>
		</div>
	);
};

export default LayoutDisplay;
