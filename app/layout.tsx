import type { Metadata } from "next";
import MainWrapper from "./components/layout/MainWrapper";
import { inter } from "./style/fonts";
import "./style/globals.css";
// import { BackgroundImageProvider } from "./providers/BackgroundImageProvider";
import Header from "./components/layout/Header";

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
				{/* <BackgroundImageProvider> */}
				<MainWrapper>
					<Header />
					{children}
				</MainWrapper>
				{/* </BackgroundImageProvider> */}
			</body>
		</html>
	);
}
