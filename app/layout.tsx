import type { Metadata } from "next";
import { inter } from "./style/fonts";
import "./style/globals.css";

export const metadata: Metadata = {
	title: "Fiorelli Guitars",
	description: "Custom guitars for the custom guitarist",
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
