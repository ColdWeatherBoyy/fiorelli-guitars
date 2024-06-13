import type { Metadata } from "next";
import MainWrapper from "./components/layout/MainWrapper";
import { inter } from "./style/fonts";
import "./style/globals.css";
import Header from "./components/layout/Header";
import BackgroundImageCarousel from "./components/layout/BackgroundImageCarousel";

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
					<BackgroundImageCarousel />
					<Header />
					{children}
				</MainWrapper>
			</body>
		</html>
	);
}
