import type { Metadata } from "next";
import BackgroundImageWrapper from "./components/layout/BackgroundImageWrapper";
import Wrapper from "./components/layout/Wrapper";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { inter } from "./style/fonts";
import "./style/globals.css";

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
					<div className="flex flex-col justify-start h-full my-12">{children}</div>
					<Footer />
				</Wrapper>
			</body>
		</html>
	);
}
