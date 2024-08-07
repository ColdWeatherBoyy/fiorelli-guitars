import type { Metadata } from "next";
import { inter } from "./style/fonts";
import "./style/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
	title: "Fiorelli Guitars",
	description: "Handcrafted guitars by Jamie Hayes",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>
				{children}
				<SpeedInsights />
			</body>
		</html>
	);
}
