"use client";

import { FC, ReactNode } from "react";

const MainWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="h-screen w-full flex justify-center items-center">{children}</div>
	);
};

export default MainWrapper;
