import type { Metadata } from "next";
import BackgroundImageWrapper from "./components/layout/BackgroundImageWrapper";
import Footer from "./components/layout/footerComponents/Footer";
import Header from "./components/layout/headerComponents/Header";
import { inter } from "./style/fonts";
import "./style/globals.css";
import Wrapper from "./components/layout/Wrapper";

export const metadata: Metadata = {
	title: "Fiorelli Guitars",
	description: "Custom Guitars for the Custom Guitarist",
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
			<body className={`${inter.className}`}>
				<BackgroundImageWrapper />
				{modal}
				<Wrapper>
					<Header />
					{children}
					<Footer />
				</Wrapper>
			</body>
		</html>
	);
}
