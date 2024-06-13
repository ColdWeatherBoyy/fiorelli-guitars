import type { Metadata } from "next";
import BackgroundImageCarousel from "./components/layout/BackgroundImageCarousel";
import Header from "./components/layout/Header";
import MainWrapper from "./components/layout/MainWrapper";
import { inter } from "./style/fonts";
import "./style/globals.css";
import WelcomeStateProvider from "./context/WelcomeStateContext";

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
				<WelcomeStateProvider>
					<MainWrapper>
						<BackgroundImageCarousel />
						<Header />
						{children}
					</MainWrapper>
				</WelcomeStateProvider>
			</body>
		</html>
	);
}
