import type { Metadata } from "next";
import BackgroundImageCarousel from "./components/layout/BackgroundImageCarousel";
import Header from "./components/layout/headerComponents/Header";
import MainWrapper from "./components/layout/MainWrapper";
import { inter } from "./style/fonts";
import "./style/globals.css";
import BackgroundImageWrapper from "./components/layout/headerComponents/BackgroundImageWrapper";

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
			<body className={inter.className}>
				<MainWrapper>
					<BackgroundImageWrapper />
					<Header />
					{children}
				</MainWrapper>
			</body>
		</html>
	);
}
