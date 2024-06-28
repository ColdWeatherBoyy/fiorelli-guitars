import type { Metadata } from "next";

import { inter } from "./style/fonts";
import "./style/globals.css";

export const metadata: Metadata = {
	title: "Fiorelli Guitar Admin Page",
	description: "Jamie, This Is Exclusively For You",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>{children}</body>
		</html>
	);
}
