import type { Metadata } from "next";

import "./style/globals.css";
import { inter } from "./style/fonts";

export const metadata: Metadata = {
	title: "Fiorelli Guitar Admin Page",
	description: "Jamie, This Is Exclusively For You",
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>{children}</body>
		</html>
	);
}
