import { useState } from "react";

export default function Layout({
	children,
	guitartype,
}: Readonly<{
	children: React.ReactNode;
	guitartype: React.ReactNode;
}>) {
	return (
		<>
			{children}
			{guitartype}
		</>
	);
}
