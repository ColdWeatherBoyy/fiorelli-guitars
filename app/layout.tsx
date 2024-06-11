import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundImage from "./components/BackgroundImage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Fiorelli Guitars",
	description: "Custom Guitars for the Custom Guitarist",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
